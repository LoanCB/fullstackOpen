const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {blogs: 0})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const users = await User.find({})
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    user: users[0],
  })

  const savedBlog = await blog.save()
  console.log(users[0])
  console.log(users[0].blogs)
  users[0].blogs = users[0].blogs.concat(savedBlog.id)
  console.log(users[0].blogs)
  await users[0].save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  await Blog.findOneAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.patch('/:id', async (request, response) => {
  const editedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true})
  response.status(200).json(editedBlog)
})

module.exports = blogsRouter
