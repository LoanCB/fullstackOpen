const mongoose = require('mongoose')
const Blog = require('./models/blog')

async function main() {
  if (process.argv.length < 4) {
    console.log('argument(s) missing')
    process.exit(1)
  }
  
  await mongoose.connect(`mongodb+srv://fullstack:${process.argv[2]}@fullstackopen-phonebook.woblaym.mongodb.net/testBlog?retryWrites=true&w=majority`)
  if (process.argv[3] === 'auto_create') {
    console.log('auto creating test blog')
    for (let i = 1; i <= 10; i++) {
      const blog = new Blog({
        title: `Test ${i}`,
        author: 'Testman',
        url: 'https://google.com',
        likes: i
      })

      await blog.save()
    }
    mongoose.connection.close()
  } else {
    console.log('function not implemented')
  }
}

main()