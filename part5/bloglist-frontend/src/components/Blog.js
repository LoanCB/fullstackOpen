import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, updateBlog}) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {display: visible ? 'none' : ''}
  const showWhenVisible = {display: visible ? '' : 'none'}

  const toggleVisible = () => setVisible(!visible)

  const addLike = async () => {
    try {
      const editedBlog = await blogService.update(blog.id, {likes: blog.likes + 1})
      updateBlog(editedBlog)
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div className='blog'>
      <div style={hideWhenVisible}>
        {blog.title}
        <button onClick={toggleVisible}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title}
        <button onClick={toggleVisible}>hide</button><br />
        {blog.url}<br />
        likes {blog.likes}
        <button onClick={addLike}>like</button><br />
        {blog.author}
      </div>
    </div>
  )
}

export default Blog
