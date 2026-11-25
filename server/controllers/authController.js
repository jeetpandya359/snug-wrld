import User from '../models/User.js'
import { assertDatabase } from '../utils/assertDatabase.js'
import { generateToken } from '../utils/generateToken.js'

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
  }
}

export async function register(req, res, next) {
  try {
    if (!assertDatabase(res)) return

    const name = String(req.body.name || '').trim()
    const email = String(req.body.email || '').trim().toLowerCase()
    const password = String(req.body.password || '')

    if (!name || !email || !password) {
      res.status(400).json({ message: 'Name, email, and password are required' })
      return
    }

    if (password.length < 8) {
      res.status(400).json({ message: 'Password must be at least 8 characters' })
      return
    }

    const user = await User.create({ name, email, password })
    res.status(201).json({
      token: generateToken(user._id),
      user: publicUser(user),
    })
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ message: 'An account with that email already exists' })
      return
    }

    next(error)
  }
}

export async function login(req, res, next) {
  try {
    if (!assertDatabase(res)) return

    const email = String(req.body.email || '').trim().toLowerCase()
    const password = String(req.body.password || '')
    const user = await User.findOne({ email }).select('+password')
    const passwordMatches = user ? await user.matchPassword(password) : false

    if (!user || !passwordMatches) {
      res.status(401).json({ message: 'Invalid email or password' })
      return
    }

    res.json({
      token: generateToken(user._id),
      user: publicUser(user),
    })
  } catch (error) {
    next(error)
  }
}

export function getProfile(req, res) {
  res.json({ user: publicUser(req.user) })
}
