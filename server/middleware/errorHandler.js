export function notFound(req, res) {
  res.status(404).json({ message: 'Route not found' })
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    next(error)
    return
  }

  if (error.name === 'ValidationError') {
    res.status(400).json({ message: error.message })
    return
  }

  const status = error.statusCode || 500

  if (status >= 500) {
    console.error(error)
  }

  res.status(status).json({
    message: status >= 500 ? 'Server error' : error.message,
  })
}
