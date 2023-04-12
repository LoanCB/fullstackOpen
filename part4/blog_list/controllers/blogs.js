const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { getDecodedToken } = require('../utils/list_helper')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {blogs: 0})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const decodedToken = getDecodedToken(request.token)
  const user = await User.findById(decodedToken.id)

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
  const decodedToken = getDecodedToken(request.token)
  const blog = await Blog.findById(request.params.id)

  console.log(decodedToken)
  console.log(blog.user)

  if (blog.user.toString() === decodedToken.id)
    await blog.remove()
  else response.status(403).json({error: "You don't have rights to remove this blog"})

  response.status(204).end()
})

blogsRouter.patch('/:id', async (request, response) => {
  const editedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true})
  response.status(200).json(editedBlog)
})

module.exports = blogsRouter
