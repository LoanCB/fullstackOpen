const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const { initialBlogs, BlogsInDb } = require('./test_helper')
const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  for (i = 0; i < initialBlogs.length; i++)
    await new Blog(initialBlogs[i]).save()
})

test('Blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Number of blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('id generated', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0]._id).toBeDefined()
})

test('create new blog', async () => {
  const blogsAtStart = await BlogsInDb()
  const newBlog = {
    title: `bar bar`,
    author: 'bar',
    url: 'https://www.google.com/',
    likes: 2
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogsAtEnd = await BlogsInDb()
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)

  const titles = blogsAtEnd.map(t => t.title)
  expect(titles).toContain(newBlog.title)
})

test('set likes to 0 if missing on creation', async () => {
  const newBlog = {
    title: `no like`,
    author: 'bar',
    url: 'https://www.google.com/',
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const response = await api.get('/api/blogs')
  expect(response.body[response.body.length - 1].likes).toBe(0)
})

test('return 400 if title is missing', async () => {
  const newBlog = {
    author: 'bar',
    url: 'https://www.google.com/',
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('return 400 if url is missing', async () => {
  const newBlog = {
    title: `no like`,
    author: 'bar',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await BlogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete._id}`)
      .expect(204)
    
    const blogsAtEnd = await BlogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)

    const titles = blogsAtEnd.map(t => t.titles)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('edition of a blog', () => {
  test('change number of likes', async () => {
    const blogsAtStart = await BlogsInDb()
    const blogToEdit = blogsAtStart[0]

    await api
      .patch(`/api/blogs/${blogToEdit._id}`)
      .send({likes: 1000})
      .expect(200)
    
    const response = await api.get('/api/blogs')
    expect(response.body[0].likes).toBe(1000)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})