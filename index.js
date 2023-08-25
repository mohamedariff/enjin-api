import "dotenv/config";

import compression from "compression";
import express from "express";
import helmet from "helmet";
import cors from "cors";

import { initMongoDB } from "./src/db/mongodb.js";
// import redis from "./src/db/redis.js";

import solatRoutes from "./src/routes/solat.js";
import userRoutes from "./src/routes/gps/user.js";
import authRoutes from "./src/routes/gps/auth.js";
import resetRoutes from "./src/routes/gps/reset.js";
import latestRoutes from "./src/routes/gps/latest.js";
import summaryRoutes from "./src/routes/gps/summary.js";
import recomputeRoutes from "./src/routes/gps/recompute.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, async () => {
  console.log(`App listening to port ${process.env.PORT} `);
  await initMongoDB();
  // await redis.connect();
});

app.get("/", (_, res) => res.send("Hekhek Sdn Bhd"));

app.use("/api/solat", solatRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reset", resetRoutes);
app.use("/api/latest", latestRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/recompute", recomputeRoutes);
