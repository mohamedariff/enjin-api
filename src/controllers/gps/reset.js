import { semutDB } from "../../db/semutdb.js";

export const resetController = async (req, res) => {
  const { date, imei } = req.body;

  if (!date || !imei)
    return res.status(400).json({
      status: "Error",
      message: `Missing required fields: ${!date ? "date" : "imei"} `,
    });

  console.log("------/api/reset------");

  try {
    const collection = semutDB.db("trips").collection(imei.toString());
    const cursor = collection.drop();
    const result = await cursor.toArray();

    console.log("=======drop collection:", result);

    res.status(200).send(result);
  } catch (err) {
    console.error(" ERROR @ /api/reset ::", err.stack);
    return res.sendStatus(404);
  }
};
