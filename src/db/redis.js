import { createClient } from "redis";

const redis = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_ENDPOINT,
    port: process.env.REDIS_PORT,
  },
});

redis.on("ready", () => {
  console.log("Redis client connected successfully");
});

redis.on("error", (error) => {
  console.error("Error connecting to Redis:", error);
});

export default redis;
