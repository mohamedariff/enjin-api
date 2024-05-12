import redis from "../db/redis.js";

const cache = async (req, res, next) => {
  const { imei, date } = req.body;
  const slug = `/api/summary/${imei}/${date}`;

  try {
    const data = await redis.get(slug)
    if (data) {
      console.log("==CACHED==", slug, !!data);
      res.send(data);
    } else {
      console.log("==NOT CACHE==");
      next();
    }
  } catch (error) {
    throw error;
  }
};

export default cache;
