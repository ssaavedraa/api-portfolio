import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'

import emailRouter from './routes/email'
import githubRouter from './routes/github'

dotenv.config()

const app = express()

const allowCors = (process.env.FRONTEND_URL != null) ? process.env.FRONTEND_URL : 'http://localhost:3000'

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
app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/email', emailRouter)
app.use('/repositories', githubRouter)

app.get('/', (_, res) => {
  res.send('api.santiagosaavedra.com.co')
})

export default app
