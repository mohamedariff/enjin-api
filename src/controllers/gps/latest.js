import { mongoDB } from "../../db/mongodb.js";

export const latestController = async (req, res) => {
  const { imei } = req.body;

  if (!imei)
    return res.status(400).json({
      status: "Error",
      message: "Missing required fields: imei ",
    });

  console.log("------/api/latest------");

  try {
    const collection = mongoDB.db("imei").collection(imei);
    const cursor = collection.find().limit(1).sort({ timestamp: -1 });
    const result = await cursor.toArray();

    res.status(200).send({ ...result[0], imei });
  } catch (err) {
    console.error(" ERROR @ /api/latest ::", err.stack);
    return res.sendStatus(404);
  }
};
