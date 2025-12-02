const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization

  // No Authorization header
  if (!authorizationHeader) {
    return res.status(401).json({
      error: 'Authentication error. Token required.',
      status: 401
    })
  }

  // Expected format: "Bearer <token>"
  const parts = authorizationHeader.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      error: 'Malformed authorization header. Expected: Bearer <token>',
      status: 401
    })
  }

  const token = parts[1]
  const secret = process.env.JWT_SECRET

  try {
    // Verify token — DO NOT pass expiresIn here
    const decoded = jwt.verify(token, secret, {
      issuer: process.env.JWT_ISSUER
    })

    req.decoded = decoded
    return next()

  } catch (err) {
    // Handle typical JWT errors cleanly
    let message = 'Authentication error.'
    if (err.name === 'TokenExpiredError') message = 'Token expired.'
    if (err.name === 'JsonWebTokenError') message = 'Invalid token.'
    if (err.name === 'NotBeforeError') message = 'Token not active yet.'

    return res.status(401).json({
      error: message,
      details: err.message,
      status: 401
    })
  }
}

module.exports = validateToken
