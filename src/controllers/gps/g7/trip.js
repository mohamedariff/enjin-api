import dayjs from "dayjs";

import redis from '../../../db/redis.js';
import { swiftDB } from "../../../db/swiftdb.js";

export const tripController = async (req, res) => {
  const { pmId, date } = req.body;

  if (!date || !pmId)
    return res.status(400).json({
      status: "Error",
      message: `Missing ${!date ? 'date' : 'pmId'} fields`
    })

  const slug = `/api/g7/trip/${date}/${pmId}`;

  console.log("------/api/g7/trip------");

  const agg = [
    {
      $match: {
        r: pmId,
        t: {
          $gte: dayjs(date).utc().utcOffset(480).startOf('day').unix(),
          $lte: dayjs(date).utc().utcOffset(480).endOf('day').unix()
        }
      }
    },
    {
      $sort: {
        t: -1
      }
    }
  ]

  try {
    const collection = swiftDB.db("sl-loc").collection("locs");
    const result = await collection.aggregate(agg).toArray()

    res.status(200).send(result);
    redis.setEx(slug, 86400, JSON.stringify(result))
  } catch (err) {
    console.error(" ERROR @ /api/g7/gg ::", err.stack);
    return res.sendStatus(404);
  }
};
