const blog = require("../models/blog")
const user = require("../models/user")

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

const BlogsInDb = async () => {
  const blogs = await blog.find({})
  return blogs.map(blog => blog.toJSON())
}


const usersInDb = async () => {
  const users = await user.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, BlogsInDb, usersInDb
}