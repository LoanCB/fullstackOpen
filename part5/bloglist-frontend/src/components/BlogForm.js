import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const BlogForm = ({blogs, setBlogs}) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      const response = await blogService.create({title, author, url})
      setBlogs(blogs.concat(response))
      setSuccessMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <>
      {errorMessage !== null && <div className='error-message'>{errorMessage}</div>}
      {successMessage !== null && <div className='success-message'>{successMessage}</div>}
      <form onSubmit={handleCreateBlog}>
        <div>
          title
          <input
            id='blog_title_input'
            type='text'
            value={title}
            name='Title'
            onChange={({target}) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input 
            id='blog_author_input'
            type='text'
            value={author}
            name='Author'
            onChange={({target}) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            id='blog_url_input'
            type='text'
            value={url}
            name='Url'
            onChange={({target}) => setUrl(target.value)}
          />
        </div>
        <button type='submit' id='create_blog_btn'>create</button>
      </form>
    </>
  )
}

BlogForm.propTypes  = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired
}

export default BlogForm
