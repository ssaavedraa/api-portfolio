import { configDotenv } from 'dotenv'
import express from 'express'

import router from './routes/routesIndex'
import SyncDatabaseRepositories from './cron/updateRepositoryDatabase'

configDotenv()

const app = express()

const { PORT } = process.env || 3000
const allowCors = process.env.FRONTEND_URL

const syncDatabaseRepositories = new SyncDatabaseRepositories()

app.use(express.json())

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', allowCors)
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

app.options('*', (_, res) => {
  res.sendStatus(200)
})

app.use(router)

syncDatabaseRepositories.start()

app.listen(PORT, () => {
  console.log('Server is running at ', PORT)
})
