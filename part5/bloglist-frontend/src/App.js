import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState({})

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage] = useState(null)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
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

  const updateBlog = (editedBlog, remove = false) => {
    if (remove) setBlogs(blogs.filter(blog => blog.id !== editedBlog.id))
    else setBlogs(blogs.map(blog => blog.id === editedBlog.id ? editedBlog : blog))
  }

  if (!('token' in user))
    return (
      <div>
        <h2>log in to application</h2>
        {errorMessage !== null && <div className='error-message'>{errorMessage}</div>}
        {successMessage !== null && <div className='success-message'>{successMessage}</div>}

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username_input'
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input 
              id='password_input'
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit' id='login_btn'>login</button>
        </form>
      </div>
    )

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      <h2>create new</h2>
      <Togglable buttonLabel='new note'>
        <BlogForm blogs={blogs} setBlogs={setBlogs}/>
      </Togglable>

      {blogs.sort((pre, next) => next.likes - pre.likes).map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} user={user} />
      )}
    </div>
  )
}

export default App