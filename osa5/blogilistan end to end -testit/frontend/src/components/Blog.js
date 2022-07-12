import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, addLikes }) => {
  const [likes, setLikes] = useState(blog.likes)
  const [infoVisible, setInfoVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: infoVisible ? '' : 'none' }

  const toggleVisibility = () => {
    infoVisible === false ? setInfoVisible(true) : setInfoVisible(false)
  }

  const removeBlog = async (deleteBlog) => {
    if (window.confirm(`Remove blog ${deleteBlog.title} by ${deleteBlog.author}`)) {
      await blogService.deleteObject(deleteBlog.id)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
  }

  const addLike = async (id) => {
    addLikes(id)
    const blog = await blogService.get(id)
    setLikes(blog.likes)
  }

  return (
    <div className={'blog'} style={blogStyle}>
      {blog.title} {blog.author} <button id="view-button" type="view" onClick={() => toggleVisibility()}>{infoVisible === false ? 'view' : 'hide'}</button>
      <div style={hideWhenVisible}>
        {blog.url}
      </div>
      <div className={'likes'} style={hideWhenVisible}>
        {likes} <button id="like-button" type="view" onClick={() => addLike(blog.id)}>like</button>
      </div>
      <div style={hideWhenVisible}>
        {blog.user.username}
      </div>
      <div style={{ display: window.localStorage.getItem('loggedBlogappUser').username === blog.user.username ? 'none' : '' }}>
        <button id="delete-button" onClick={() => removeBlog(blog)}>remove</button>
      </div>
    </div>
  )
}

Blog.displayName = 'Blog'

export default Blog