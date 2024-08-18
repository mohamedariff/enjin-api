import { swiftDB } from "../../../db/swiftdb.js";

export const latestController = async (req, res) => {
  const { pmIds } = req.body;

  if (!pmIds.length)
    return res.status(400).json({
      status: "Error",
      message: `Missing pmIds fields`
    })

  console.log("------/api/g7/latest------");

  try {
    const collection = swiftDB.db("sl-loc").collection("locs");
    const promises = pmIds.map(async (pmId) => await collection.findOne({ r: pmId }));
    const results = await Promise.all(promises);
    res.status(200).send(results);
  } catch (err) {
    console.error(" ERROR @ /api/g7/latest ::", err.stack);
    return res.sendStatus(404);
  }
};
