import { useState } from 'react'
import blogService from '../services/blogs'

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
            type='text'
            value={title}
            name='Title'
            onChange={({target}) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input 
            type='text'
            value={author}
            name='Author'
            onChange={({target}) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input 
            type='text'
            value={url}
            name='Url'
            onChange={({target}) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default BlogForm
