import { MongoClient, ServerApiVersion } from "mongodb";

const MONGO_CONFIG = process.env.MONGODB;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const mongoDB = new MongoClient(MONGO_CONFIG, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function initMongoDB() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await mongoDB.connect();
    // Send a ping to confirm a successful connection
    await mongoDB.db("imei").command({ ping: 1 });

    console.log("Pinged & successfully connected to MongoDB!");
  } catch (e) {
    console.log("MongoDB Init Failed", e);
  } finally {
    // Ensures that the client will close when you finish/error
    // await mongoDB.close();
  }
}
