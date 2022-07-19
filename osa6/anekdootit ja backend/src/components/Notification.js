import {useDispatch, useSelector} from 'react-redux'
import {clearNotification, setNotification} from "../reducers/notificationReducer";
import {forwardRef, useImperativeHandle, useState} from "react";

const Notification = forwardRef((props, ref) => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notifications)
  const [notificationVisible, setNotificationVisible] = useState(false)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notificationVisible ? '' : 'none'
  }

  const sendNotificationMessageTimeout = (message, delaySeconds) => {
    dispatch(setNotification(message))
    setNotificationVisible(true)
    setTimeout(() => {
      dispatch(clearNotification())
      setNotificationVisible(false)
    }, delaySeconds * 1000)
  }

  useImperativeHandle(ref, () => {
    return {
      sendNotificationMessageTimeout
    }
  })

  return (
    <div style={style}>
      {notification}
    </div>
  )
})

export default Notification