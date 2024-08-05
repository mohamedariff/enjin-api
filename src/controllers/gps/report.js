import dayjs from "dayjs";

import redis from '../../db/redis.js'
import { semutDB } from "../../db/semutdb.js";

import { detectRefuelEvents } from '../../utils/report.js'

export const fuelReportController = async (req, res) => {
  const { range, date, imei } = req.body;

  if (!date || !imei)
    return res.status(400).json({
      status: "Error",
      message: `Missing required fields: ${!range ? "range" : !imei ? "imei" : "date"} `,
    });

  console.info("------/api/report/fuel------");

  const slug = `/api/report/fuel/${imei}/${date}/${range}`;

  const agg = [
    {
      $match: {
        timestamp: {
          $gte: dayjs(date).utc().utcOffset(480).startOf(range).toDate(),
          $lte: dayjs(date).utc().utcOffset(480).endOf(range).toDate()
        }
      }
    },
    {
      $sort: {
        timestamp: 1
      }
    },
    {
      $project: {
        _id: 0,
        timestamp: 1,
        fuel: '$metadata.IOelement.Elements.390',
        obdOdo: '$metadata.IOelement.Elements.389',
        odo: '$metadata.IOelement.Elements.16',
      }
    }
  ]

  try {
    const collection = semutDB.db("imei").collection(imei.toString());
    const result = await collection.aggregate(agg).toArray()

    const findFuel = result.map((raw, index) => {
      const isRefill = raw?.fuel > result[index - 1]?.fuel
      const isNextFuelNil = raw?.fuel && !result[index - 1]?.fuel
      const isCurrentFuelNil = !raw?.fuel && result[index - 1]?.fuel

      if (isRefill || isCurrentFuelNil || isNextFuelNil) return raw
    }).filter(d => d?.fuel)

    const refuelEvents = detectRefuelEvents(findFuel)

    res.status(200).send(refuelEvents);
    redis.setEx(slug, 86400, JSON.stringify(refuelEvents))
  } catch (err) {
    console.error(" ERROR @ /api/report/fuel ::", err.stack);
    return res.sendStatus(404);
  }
};

export const tripReportController = async (req, res) => {
  const { date, imei } = req.body;

  // if (!date || !imei)
  //   return res.status(400).json({
  //     status: "Error",
  //     message: `Missing required fields: ${!date ? "date" : "imei"} `,
  //   });

  // console.log("------/api/report/trip------");

  // const slug = `/api/report/trip/${imei}/${date}`;
  // const theDate = dayjs(date).format(DATE_FORMAT_REVERSE);

  // try {
  //   const collection = semutDB.db("trips").collection(imei.toString());
  //   const result = await collection.findOne({ date: theDate });

  //   res.status(200).send(result);
  // } catch (err) {
  //   console.error(" ERROR @ /api/report/trip ::", err.stack);
  //   return res.sendStatus(404);
  // }
};