import { useState, useEffect} from 'react'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationMessageColor, setNotificationMessageColor] = useState('')
  const [createBlogVisible, setCreateBlogVisible] = useState(false)


  const sendNotificationMessageTimeout = ({ message, type }) => {
    setNotificationMessage(message)
    setNotificationMessageColor(type)
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationMessageColor('')
    }, 2000)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }  }, [])

  const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

  const handleLogout = async () => {
    window.localStorage.clear()
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <LoginForm username = {username} setUsername = {setUsername}
          password = {password} setPassword = {setPassword}
          setUser = {setUser}
          notificationMessage = {notificationMessage} notificationMessageColor = {notificationMessageColor}
          sendNotificationMessageTimeout = {sendNotificationMessageTimeout}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message = {notificationMessage} type = {notificationMessageColor}/>
      <h3>{user.username} logged in <button onClick={() => handleLogout()} type="submit">logout</button></h3>
      <div style={hideWhenVisible}>
        <button onClick={() => setCreateBlogVisible(true)}>new blog</button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm sendNotificationMessageTimeout = {sendNotificationMessageTimeout} setCreateBlogVisible = {setCreateBlogVisible}/>
        <button onClick={() => setCreateBlogVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

App.displayName = 'App'

export default App
