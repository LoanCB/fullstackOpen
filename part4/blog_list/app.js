const express = require('express')
const cors = require('cors')
require('express-async-errors')
const mongoose = require('mongoose')

const { MONGODB_URI } = require('./utils/config')
const app = express()
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const errorHandler = require('./utils/middleware')

mongoose.set('strictQuery', false)
mongoose.connect(MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(errorHandler)

module.exports = app