import loginService from '../services/login'
import blogService from '../services/blogs'
import Notification from './Notification'

const LoginForm = ({
  username, setUsername, password, setPassword, setUser,
  notificationMessage, notificationMessageColor,
  sendNotificationMessageTimeout
}) => {

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username : username, password : password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      sendNotificationMessageTimeout({ message: 'Wrong username or password', type: 'error' })
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <h2>Log in to application</h2>
        <Notification message = {notificationMessage} type = {notificationMessageColor}/>
                Username <input
          type="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
                Password <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.displayName = 'LoginForm'

export default LoginForm