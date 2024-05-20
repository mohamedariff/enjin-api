import { ObjectId } from 'mongodb'
import { semutDB } from '../../db/semutdb.js'
import redis from '../../db/redis.js'

export const tripController = async (req, res) => {
  const { imei, _id } = req.body

  if (!imei || !_id)
    return res.status(400).json({
      status: 'Error',
      message: 'Missing required fields: imei '
    })

  const slug = `/api/trip/${imei}/${_id}`
  console.log('------/api/trip------')

  try {
    const collection = semutDB.db('tripsz').collection(imei.toString())
    const result = await collection.find({ _id: new ObjectId(_id) }).toArray()
    res.status(200).send({ imei, ...result })
    redis.setEx(slug, 86400, JSON.stringify(result))
  } catch (err) {
    console.error(' ERROR @ /api/trip ::', err.stack)
    return res.sendStatus(404)
  }
}
