import mongoose from 'mongoose'

export function assertDatabase(res) {
  if (mongoose.connection.readyState === 1) return true

  res.status(503).json({ message: 'Database is not connected' })
  return false
}
