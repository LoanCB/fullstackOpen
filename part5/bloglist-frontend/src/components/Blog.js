import { useState } from 'react'

const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {display: visible ? 'none' : ''}
  const showWhenVisible = {display: visible ? '' : 'none'}

  const toggleVisible = () => setVisible(!visible)

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
        <button>like</button><br />
        {blog.author}
      </div>
    </div>
  )
}

export default Blog