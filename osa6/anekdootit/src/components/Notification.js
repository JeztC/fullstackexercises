import {useDispatch, useSelector} from 'react-redux'
import {setNotification} from "../reducers/notificationReducer";
import {forwardRef, useImperativeHandle, useState} from "react";

const Notification = forwardRef((props, ref) => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notifications)
  const [notificationVisible, setNotificationVisible] = useState(false)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notificationVisible ? "" : 'none'
  }

  const sendNotificationMessageTimeout = (message) => {
    dispatch(setNotification(message))
    setNotificationVisible(true)
    setTimeout(() => {
      dispatch(setNotification(''))
      setNotificationVisible(false)
    }, 5000)
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