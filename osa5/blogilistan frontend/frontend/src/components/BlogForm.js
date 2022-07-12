import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import Blog from './Blog'

const BlogForm = ({ sendNotificationMessageTimeout, setCreateBlogVisible }) => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const updateBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  useEffect(() => {
    updateBlogs()

    return () => {}
  }, [])

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      await blogService.create({ title, author, url })
      await updateBlogs()
      sendNotificationMessageTimeout({ message: `A new blog ${title} by ${author} added`, type: 'notification' })
      setTitle('')
      setAuthor('')
      setUrl('')
      setCreateBlogVisible(false)
    } catch (exception) {
      sendNotificationMessageTimeout({ message: 'Error while adding a blog!', type: 'error' })
    }
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          <h2>Create new blog</h2>
                    Title: <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
                    Author: <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
                    Url: <input
            type="url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
      {blogs
        .sort((a, b) => {return b.likes - a.likes})
        .map(blog =>
          <Blog key={blog.id} blog={blog} setBlogs = {setBlogs}/>
        )}
    </div>
  )}

BlogForm.displayName = 'BlogForm'

BlogForm.propTypes = {
  sendNotificationMessageTimeout: PropTypes.func.isRequired,
  setCreateBlogVisible: PropTypes.func.isRequired,
}

export default BlogForm