const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)
const initialBlogs = [
  {
    title: `Django is the best framework <3`,
    author: 'Loan CB',
    url: 'https://www.djangoproject.com/',
    likes: 17
  },
  {
    title: `Foo`,
    author: 'foo',
    url: 'https://googe.com',
    likes: 2
  },
  {
    title: `HTML is easy`,
    author: 'Loan CB',
    url: 'https://googe.com',
    likes: 8
  }
]

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
  const newBlog = {
    title: `Foo 2`,
    author: 'foo',
    url: 'https://google.com',
    likes: 4
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(contents).toContain('Foo 2')
})

test('set likes to 0 if missing on creation', async () => {
  const newBlog = {
    title: `Foo 3`,
    author: 'foo',
    url: 'https://google.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body[response.body.length - 1].likes).toBe(0)
})

test('return 400 if title is missing', async () => {
  const newBlog = {
    author: 'foo',
    url: 'https://google.com',
    likes: 4
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('return 400 if url is missing', async () => {
  const newBlog = {
    title: 'test url missing',
    author: 'foo',
    likes: 4
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

afterAll(async () => {
  await mongoose.connection.close()
})