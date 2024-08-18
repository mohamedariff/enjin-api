import { MongoClient, ServerApiVersion } from "mongodb";

const SWIFT_CONFIG = process.env.SWIFTDB;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const swiftDB = new MongoClient(SWIFT_CONFIG, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function initSwiftDB() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await swiftDB.connect();
    // Send a ping to confirm a successful connection
    await swiftDB.db("imei").command({ ping: 1 });

    console.log("Pinged & successfully connected to SwiftDB!");
  } catch (e) {
    console.log("SwiftDB Init Failed", e);
  } finally {
    // Ensures that the client will close when you finish/error
    // await mongoDB.close();
  }
}
