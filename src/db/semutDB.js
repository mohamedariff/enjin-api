import { MongoClient, ServerApiVersion } from "mongodb";

const MONGO_CONFIG = process.env.SEMUTDB;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const semutDB = new MongoClient(MONGO_CONFIG, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function initSemutDB() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await semutDB.connect();
    // Send a ping to confirm a successful connection
    await semutDB.db("imei").command({ ping: 1 });

    console.log("Pinged & successfully connected to SemutDB!");
  } catch (e) {
    console.log("SemutDB Init Failed", e);
  } finally {
    // Ensures that the client will close when you finish/error
    // await mongoDB.close();
  }
}
