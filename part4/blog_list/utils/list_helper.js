const jwt = require('jsonwebtoken')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, current) => sum + current.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, current) => max.likes > current.likes ? max : current)
}

const mostBlogsOrLikes = (blogs, likes = false) => {
  let result = []
  
  for (let i = 0; i < blogs.length; i++){
    let objectFoundIndex = result.findIndex(blog => blog.author.includes(blogs[i].author))
    if (objectFoundIndex > 0) {
        likes ? result[objectFoundIndex].likes += blogs[i].likes : result[objectFoundIndex].blogs += 1
    } else {
        result.push(likes ? {author: blogs[i].author, likes: blogs[i].likes} : {author: blogs[i].author, blogs: 1})
    }
  }

  return result
}

const mostBlogs = (blogs) => {
  const result = mostBlogsOrLikes(blogs)
  return result.reduce((max, current) => max.blogs > current.blogs ? max : current)
}

const mostLikes = (blogs) => {
  const result = mostBlogsOrLikes(blogs, true)
  return favoriteBlog(result)
}

const getDecodedToken = token => {
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id)
    return response.status(401).json({error: 'token invalid'})
  return decodedToken
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes, getDecodedToken
}
