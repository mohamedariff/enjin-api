import 'dotenv/config'

import compression from 'compression'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

import redis from './src/db/redis.js'
import { initSemutDB } from './src/db/semutdb.js'

import solatRoutes from './src/routes/solat.js'
import userRoutes from './src/routes/gps/user.js'
import authRoutes from './src/routes/gps/auth.js'
import tripRoutes from './src/routes/gps/trip.js'
import resetRoutes from './src/routes/gps/reset.js'
import latestRoutes from './src/routes/gps/latest.js'
import summaryRoutes from './src/routes/gps/summary.js'
import recomputeRoutes from './src/routes/gps/recompute.js'

const app = express()

app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(process.env.PORT, async () => {
  console.log(`App listening to port ${process.env.PORT} `)
  // await initMongoDB();
  await initSemutDB()
  await redis.connect()
})

app.get('/', (_, res) => res.send('Hekhek Sdn Bhd'))

app.use('/api/solat', solatRoutes)
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/trip', tripRoutes)
app.use('/api/reset', resetRoutes)
app.use('/api/latest', latestRoutes)
app.use('/api/summary', summaryRoutes)
app.use('/api/recompute', recomputeRoutes)
