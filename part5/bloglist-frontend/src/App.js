import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

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

  const errorStyle = {
    color: "red",
    backgroundColor: "#C3C3C3",
    border: "2px solid red",
    padding: "10px",
  }

  const successStyle = {
    color: "green",
    backgroundColor: "#C3C3C3",
    border: "2px solid green",
    padding: "10px",
  }

  if (user === null)
    return (
      <div>
        <h2>log in to application</h2>
        {errorMessage !== null && <div style={errorStyle}>{errorMessage}</div>}
        {successMessage !== null && <div style={successStyle}>{successMessage}</div>}

        <form onSubmit={handleLogin}>
          <div>
            username
            <input 
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input 
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      <h2>create new</h2>
      {errorMessage !== null && <div style={errorStyle}>{errorMessage}</div>}
      {successMessage !== null && <div style={successStyle}>{successMessage}</div>}

      <form onSubmit={handleCreateBlog}>
        <div>
          title
          <input 
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input 
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input 
            type='text'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App