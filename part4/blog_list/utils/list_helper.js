const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, current) => sum + current.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, current) => max.likes > current.likes ? max : current)
}

const mostBlogs = (blogs) => {
  let result = []
  
  for (let i = 0; i < blogs.length; i++){
    let objectFoundIndex = result.findIndex(blog => blog.author.includes(blogs[i].author))
    if (objectFoundIndex > 0) {
        result[objectFoundIndex].blogs += 1
    } else {
        result.push({author: blogs[i].author, blogs: 1})
    }
  }

  return favoriteBlog(result)
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}
