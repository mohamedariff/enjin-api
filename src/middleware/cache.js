import redis from '../db/redis.js'

const cache = async (req, res, next) => {
  const { imei, date, _id } = req.body

  const summarySlug = `/api/summary/${imei}/${date}`
  const tripSlug = `/api/trip/${imei}/${_id}`

  const slug = _id ? tripSlug : summarySlug
  try {
    const cache = await redis.get(slug)
    if (cache) {
      console.log('==CACHED==', slug, !!cache)
      res.send(cache)
    } else {
      console.log('==NOT CACHE==')
      next()
    }
  } catch (error) {
    throw error
  }
}

export default cache
