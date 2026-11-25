import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export async function protect(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''

  if (!token) {
    res.status(401).json({ message: 'Authentication required' })
    return
  }

  try {
    const secret = process.env.JWT_SECRET

    if (!secret) {
      res.status(500).json({ message: 'JWT_SECRET is not configured' })
      return
    }

    const decoded = jwt.verify(token, secret)
    const user = await User.findById(decoded.id).select('-password')

    if (!user) {
      res.status(401).json({ message: 'User not found' })
      return
    }

    req.user = user
    next()
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}
