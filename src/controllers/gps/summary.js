import dayjs from "dayjs";

import { semutDB } from "../../db/semutdb.js";
import { DATE_FORMAT_REVERSE } from "../../utils/constant.js";

export const summaryController = async (req, res) => {
  const { date, imei } = req.body;

  if (!date || !imei)
    return res.status(400).json({
      status: "Error",
      message: `Missing required fields: ${!date ? "date" : "imei"} `,
    });

  console.log("------/api/summary------");

  // const slug = `/api/summary/${imei}/${date}`;
  const theDate = dayjs(date).format(DATE_FORMAT_REVERSE);

  try {
    const collection = semutDB.db("trips").collection(imei.toString());
    const result = await collection.findOne({ date: theDate });
    res.status(200).send(result);
  } catch (err) {
    console.error(" ERROR @ /api/summary ::", err.stack);
    return res.sendStatus(404);
  }
};
