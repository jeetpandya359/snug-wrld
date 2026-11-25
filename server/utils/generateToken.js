import jwt from 'jsonwebtoken'

export function generateToken(userId) {
  const secret = process.env.JWT_SECRET

  if (!secret) {
    const error = new Error('JWT_SECRET is not configured')
    error.statusCode = 500
    throw error
  }

  return jwt.sign({ id: userId }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
}
