const cache = (req, res, next) => {
  const { imei, date } = req.body;

  const slug = `/api/v2/summary/${imei}/${date}`;

  // redis.get(slug, (err, data) => {
  //   if (err) throw err;
  //   if (data !== null) {
  //     console.log("==CACHE==", slug, !!data);
  //     res.send(data);
  //   } else {
  //     console.log("==NOT CACHE==");
  //     next();
  //   }
  // });
};

module.exports = cache;
