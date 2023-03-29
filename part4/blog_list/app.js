const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const { MONGODB_URI } = require('./utils/config')
const app = express()
const blogsRouter = require('./controllers/blogs')
const errorHandler = require('./utils/middleware')

mongoose.connect(MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use(errorHandler)

module.exports = app