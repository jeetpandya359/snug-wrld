import mongoose from 'mongoose'

export async function connectDB() {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    console.warn('MONGODB_URI is not set. API is running without a database.')
    return
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    })
    console.log('MongoDB connected')
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`)
    console.error('API is running without a database.')
  }
}

export function getDbStatus() {
  return mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
}
