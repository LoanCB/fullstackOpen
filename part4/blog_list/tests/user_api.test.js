const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')
const { usersInDb } = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

describe('User creation', () => {
  test('create user', async () => {
    const usersAtStart = await usersInDb()
    const newUser = {
      username: "test",
      password: "secret",
      name: "foo"
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('cannot create user with same username', async () => {
    const usersAtStart = await usersInDb()
    const newUser = {
      username: "test",
      password: "secret",
      name: "foo"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})