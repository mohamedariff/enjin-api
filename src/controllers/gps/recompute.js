import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);

import { semutDB } from "../../db/semutdb.js";
import chunkArray from "../../utils/chunkArray.js";

export const recomputeController = async (req, res) => {
  const { date, imei } = req.body;

  if (!date || !imei)
    return res.status(400).json({
      status: "Error",
      message: `Missing ${!date ? "date" : "imei"} fields`,
    });

  console.log("------/api/recompute------");

  const agg = [
    {
      $match: {
        timestamp: {
          $gte: dayjs(date).utc().utcOffset(480).startOf("day").toDate(),
          $lte: dayjs(date).utc().utcOffset(480).endOf("day").toDate(),
        },
      },
    },
    {
      $sort: {
        timestamp: 1,
      },
    },
    {
      $project: {
        _id: 0,
        timestamp: 1,
        ignition: 1,
        lat: "$metadata.GPSelement.Latitude",
        lon: "$metadata.GPSelement.Longitude",
        speed: "$metadata.GPSelement.Speed",
        angle: "$metadata.GPSelement.Angle",
        fuel: "$metadata.IOelement.Elements.390",
        obdOdo: "$metadata.IOelement.Elements.389",
        odo: "$metadata.IOelement.Elements.16",
        violation: "$metadata.IOelement.Elements.253",
        runtime: "$metadata.IOelement.Elements.42",
      },
    },
  ];

  try {
    const collection = semutDB.db("imei").collection(imei.toString());
    const dayCollections = await collection.aggregate(agg).toArray();

    if (!dayCollections.length) return res.status(200).send([]);

    let dailyTripsTimestamps = [];
    let remove1stTrip = false;
    let isObdDevice = false;
    let toggle = false;

    // find on off igninition state
    dayCollections.map((raw, index) => {
      if (!toggle && raw.ignition == 1) {
        if (index <= 1 && dayCollections[0].ignition) {
          return (remove1stTrip = true);
        }
        if (raw.runtime) isObdDevice = true;
        toggle = true;
        dailyTripsTimestamps = [
          ...dailyTripsTimestamps,
          dayCollections[index].timestamp,
        ];
      }
      if (toggle && raw.ignition == 0 && (isObdDevice ? !raw.runtime : true)) {
        toggle = false;
        isObdDevice = false;
        dailyTripsTimestamps = [
          ...dailyTripsTimestamps,
          dayCollections[index - 1].timestamp,
        ];
      }
    });

    console.log("=dailyTripsTimestamps=", dailyTripsTimestamps.length);

    // Make array of start and end trips timestamp
    const start_stop_timestamp = chunkArray(dailyTripsTimestamps, 2);

    // Remove continue from yesterdays's trip.
    // ex: travel from 11.30pm to 1am. this logic will remove the 12.00am to 1am trip in the next day
    if (remove1stTrip) start_stop_timestamp.shift();

    if (!start_stop_timestamp) return res.status(200).send("No Trips");

    // Filter trips that have the same start and end timestamp
    const filtered_start_stop_timestamps = start_stop_timestamp?.filter(
      (data) => data[0] !== data[1]
    );

    start_stop_timestamp.length !== filtered_start_stop_timestamps.length &&
      console.error("1 or more trips missing");

    // Filter that may missing start or end timestamp
    const filter_no_start_or_end_timestamp =
      filtered_start_stop_timestamps.filter((data) => data.length === 2);

    console.time("compute trips");

    const trips = filter_no_start_or_end_timestamp.map((data, index) => {
      // Filter from queried ranging date
      const trip = dayCollections.filter(
        (raw) => raw.timestamp >= data[0] && raw.timestamp <= data[1]
      );

      // Append speed used for find max speed
      const speed = trip.map((raw) => raw.speed);
      const fuel = trip.map((raw) => raw.fuel).filter((f) => f);
      const runtime = trip.map((raw) => raw.runtime).filter((f) => f);

      // Iterate trips to append for graph/d3 info
      const coordinates = trip.map((raw) => {
        return {
          speed: raw.speed,
          lat: raw.lat,
          lon: raw.lon,
          ts: raw.timestamp,
          odo: raw.odo / 1000,
          ang: raw.angle,
          fuel: raw.fuel,
          dur: raw.runtime,
          v: raw.violation,
        };
      });

      // build/compute trips
      const summary = {
        index,
        startTime: trip[0].timestamp,
        endTime: trip[trip.length - 1].timestamp,
        duration: dayjs(trip[trip.length - 1].timestamp).diff(
          trip[0].timestamp,
          "minutes"
        ),
        distance: (trip[trip.length - 1].odo - trip[0].odo) / 1000,
        topSpeed: Math.max(...speed),
        avgSpeed: (speed.reduce((a, b) => a + b, 0) / speed.length).toFixed(2),
        fuelUsed: fuel[0] - fuel[fuel.length - 1],
        runtimeTotal: runtime[runtime.length - 1] - runtime[0],
        coordinates,
      };
      return summary;
    });

    console.timeEnd("compute trips");

    const summarized_trips = { date: date, trips };
    res.status(200).send(summarized_trips);

    const trips_collection = mongoDB.db("trips").collection(imei.toString());
    await trips_collection.deleteMany({ date });
    await trips_collection.insertOne(summarized_trips);

  } catch (err) {
    console.error(" ERROR @ /api/recompute ::", err.stack);
    return res.sendStatus(404);
  }
};
