const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/users')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: `Forbidden: ${error.message} ` })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  // code that extracts the token
  const authorization = request.get('authorization')
  // console.log(authorization)
  // pt test maine 26/07:
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }


  next()
}

const userExtractor = async (request, response, next) => {
  // code that extracts the token
  const authorization = request.get('authorization')
  console.log('authorization header in userExtractor: ', authorization)
  // pt test maine 26/07:
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  console.log('Decoded token in userExtractor', decodedToken)
  request.user = await User.findById(decodedToken.id)

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
}
