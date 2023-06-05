import { configDotenv } from 'dotenv'
import express from 'express'

import router from './routes/routesIndex'

configDotenv()

const app = express()

const { PORT } = process.env || 3000

app.use(express.json())

app.use(router)

app.listen(PORT, () => {
  console.log('Server is running at ', PORT)
})
