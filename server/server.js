import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { connectDB, getDbStatus } from './config/db.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '.env') })

const app = express()
const port = Number(process.env.PORT) || 5000
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173'

app.use(
  cors({
    origin: clientUrl,
  }),
)
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'snug-wrld-api',
    database: getDbStatus(),
  })
})

app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)
app.use(notFound)
app.use(errorHandler)

async function start() {
  await connectDB()

  const server = app.listen(port, () => {
    console.log(`SNUG WRLD API listening on http://localhost:${port}`)
  })

  server.on('error', (error) => {
    console.error(error.message)
    process.exit(1)
  })
}

start()
