import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = (props) => {
  const [likes, setLikes] = useState(props.blog.likes)
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
      props.setBlogs(blogs)
    }
  }

  const addLike = async (id) => {
    const blog = await blogService.get(id)
    const newblog = {
      blog : blog.blog,
      author : blog.author,
      url : blog.url,
      likes : blog.likes + 1,
      user : blog.user,
      id : blog.id
    }
    const requestBlog = await blogService.put(id, newblog)
    setLikes(requestBlog.likes)
  }

  return (
    <div style={blogStyle}>
      {props.blog.title} {props.blog.author} <button type="view" onClick={() => toggleVisibility()}>{infoVisible === false ? 'view' : 'hide'}</button>
      <div style={hideWhenVisible}>
        {props.blog.url}
      </div>
      <div style={hideWhenVisible}>
        {likes} <button type="view" onClick={() => addLike(props.blog.id)}>like</button>
      </div>
      <div style={hideWhenVisible}>
        {props.blog.user.username}
      </div>
      <div style={{ display: window.localStorage.getItem('loggedBlogappUser').username === props.blog.user.username ? 'none' : '' }}>
        <button onClick={() => removeBlog(props.blog)}>remove</button>
      </div>
    </div>
  )
}

Blog.displayName = 'Blog'

export default Blog