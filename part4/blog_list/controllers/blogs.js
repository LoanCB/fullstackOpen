const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {blogs: 0})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const user = await User.findById(request.decodedToken.id)

  const blog = new Blog({
    url: request.body.url,
    title: request.body.title,
    author: request.body.author,
    user: user,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findOneAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.patch('/:id', async (request, response) => {
  const editedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true})
  response.status(200).json(editedBlog)
})

module.exports = blogsRouter
