const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') return response.status(400).json({error: error.message})
  else if (error.name === 'JsonWebTokenError') return response.status(400).json({error: error.message})

  next(error)
}

const tokenExtractor = (request, response, next) => {
  let authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer '))
    authorization = authorization.replace('Bearer ', '')
  else authorization = null

  const decodedToken = jwt.verify(authorization, process.env.SECRET)
  if (!decodedToken.id)
    return response.status(401).json({error: 'token invalid'})
  
  request.decodedToken = decodedToken

  next()
}

module.exports = {
  errorHandler, tokenExtractor
}
