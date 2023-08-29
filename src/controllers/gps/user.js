import { mongoDB } from "../../db/mongodb.js";

export const updateUserController = async (req, res) => {
  const { email, data } = req.body;

  if (!email)
    return res.status(400).json({
      status: "Error",
      message: "Missing required fields: email ",
    });

  console.log("------/api/user/update------");

  // create a filter based on email
  const filter = { email: email };
  // this option instructs the method to create a document if no documents match the filter
  const options = { upsert: true };
  // create a document that sets the user document
  const updateDoc = { $set: { ...data } };

  try {
    const collection = mongoDB.db("user").collection(email);
    const result = await collection.findOneAndUpdate(
      filter,
      updateDoc,
      options
    );

    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );

    res.status(200).end();
  } catch (err) {
    console.error(" ERROR @ /api/user/insert ::", err.stack);
    res.sendStatus(404);
  }
};

export const getUserController = async (req, res) => {
  const { email } = req.body;

  if (!email)
    return res.status(400).json({
      status: "Error",
      message: "Missing required fields: email ",
    });

  console.log("------/api/user------");

  try {
    const collection = mongoDB.db("user").collection(email);
    const result = await collection.findOne({ email: email });
    res.status(200).send(result);
  } catch (err) {
    console.error(" ERROR @ /api/user ::", err.stack);
    res.sendStatus(404);
  }
};
