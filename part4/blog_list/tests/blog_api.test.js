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
  await api
    .post('/api/blogs')
    .send(initialBlogs[0])
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(contents).toContain('Foo 2')
})

test('set likes to 0 if missing on creation', async () => {
  await api
    .post('/api/blogs')
    .send(initialBlogs[0])
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body[response.body.length - 1].likes).toBe(0)
})

test('return 400 if title is missing', async () => {
  await api
    .post('/api/blogs')
    .send(initialBlogs[0])
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('return 400 if url is missing', async () => {
  await api
    .post('/api/blogs')
    .send(initialBlogs[0])
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await BlogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const blogsAtEnd = await BlogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)

    const titles = blogsAtEnd.map(t => t.titles)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})