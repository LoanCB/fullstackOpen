const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {blogs: 0})
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const blog = new Blog({
    url: request.body.url,
    title: request.body.title,
    author: request.body.author,
    user: request.user,
  })

  const savedBlog = await blog.save()
  request.user.blogs = request.user.blogs.concat(savedBlog.id)
  await request.user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === request.user.id)
    await blog.remove()
  else response.status(403).json({error: "You don't have rights to remove this blog"})

  response.status(204).end()
})

blogsRouter.patch('/:id', async (request, response) => {
  const editedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true}).populate('user', {blogs: 0})
  response.status(200).json(editedBlog)
})

module.exports = blogsRouter
