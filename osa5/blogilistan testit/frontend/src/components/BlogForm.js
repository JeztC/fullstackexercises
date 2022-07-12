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

  const addLikes = async (id) => {
    const blog = await blogService.get(id)
    const newblog = {
      blog : blog.blog,
      author : blog.author,
      url : blog.url,
      likes : blog.likes + 1,
      user : blog.user,
      id : blog.id
    }
    await blogService.put(id, newblog)
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
            id='blog-title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
                    Author: <input
            type="text"
            value={author}
            name="Author"
            id='blog-author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
                    Url: <input
            type="url"
            value={url}
            name="Url"
            id='blog-url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='create-new-blog' type="submit">create</button>
      </form>
      {blogs
        .sort((a, b) => {return b.likes - a.likes})
        .map(blog =>
          <Blog key={blog.id} blog = {blog} setBlogs = {setBlogs} addLikes = {addLikes}/>
        )}
    </div>
  )}

BlogForm.displayName = 'BlogForm'

BlogForm.propTypes = {
  sendNotificationMessageTimeout: PropTypes.func.isRequired,
  setCreateBlogVisible: PropTypes.func.isRequired,
}

export default BlogForm