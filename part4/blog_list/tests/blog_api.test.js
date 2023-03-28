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

afterAll(async () => {
  await mongoose.connection.close()
})