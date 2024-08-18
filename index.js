import 'dotenv/config'

import cors from 'cors'
import helmet from 'helmet'
import express from 'express'
import compression from 'compression'

import redis from './src/db/redis.js'
import { initSemutDB } from './src/db/semutdb.js'
import { initSwiftDB } from './src/db/swiftdb.js'

import solatRoutes from './src/routes/solat.js'

import g7Routes from './src/routes/gps/g7/index.js'

import userRoutes from './src/routes/gps/user.js'
import authRoutes from './src/routes/gps/auth.js'
import tripRoutes from './src/routes/gps/trip.js'
import resetRoutes from './src/routes/gps/reset.js'
import reportRoutes from './src/routes/gps/report.js'
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
  initSemutDB()
  initSwiftDB()
  redis.connect()
})

app.get('/', (_, res) => res.send('Hekhek Sdn Bhd'))

app.use('/api/solat', solatRoutes)

app.use('/api/g7', g7Routes)

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/trip', tripRoutes)
app.use('/api/reset', resetRoutes)
app.use('/api/report', reportRoutes)
app.use('/api/latest', latestRoutes)
app.use('/api/summary', summaryRoutes)
app.use('/api/recompute', recomputeRoutes)
