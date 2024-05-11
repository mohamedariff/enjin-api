import { semutDB } from "../../db/semutdb.js";

export const latestController = async (req, res) => {
  const { imei } = req.body;

  if (!imei)
    return res.status(400).json({
      status: "Error",
      message: "Missing required fields: imei ",
    });

  console.log("------/api/latest------");

  try {
    const collection = semutDB.db("imei").collection(imei.toString());
    const cursor = collection.find().limit(1).sort({ timestamp: -1 });
    const result = await cursor.toArray();

    res.status(200).send({ ...result[0], imei });
  } catch (err) {
    console.error(" ERROR @ /api/latest ::", err.stack);
    return res.sendStatus(404);
  }
};
