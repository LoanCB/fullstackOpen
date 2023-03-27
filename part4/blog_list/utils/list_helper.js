const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, current) => sum + current.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, current) => max.likes > current.likes ? max : current)
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}
