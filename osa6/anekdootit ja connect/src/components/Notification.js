import {connect} from 'react-redux'
import {clearNotification, setNotification} from "../reducers/notificationReducer";
import {forwardRef, useImperativeHandle, useState} from "react";

let timeoutId = 0;

const Notification = forwardRef((props, ref) => {
  const [notificationVisible, setNotificationVisible] = useState(false)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notificationVisible ? '' : 'none'
  }

  const sendNotificationMessageTimeout = (message, delaySeconds) => {
    if (timeoutId !== 0) {
      clearTimeout(timeoutId)
    }
    props.setNotification(message);
    setNotificationVisible(true)
    timeoutId = setTimeout(() => {
      props.clearNotification();
      setNotificationVisible(false)
      timeoutId = 0
    }, delaySeconds * 1000)
  }

  useImperativeHandle(ref, () => {
    return {
      sendNotificationMessageTimeout
    }
  })

  return (
    <div style={style}>
      {props.notifications}
    </div>
  )
})

const mapDispatchToProps = {
  setNotification,
  clearNotification,
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  }
}

export default connect(
    mapStateToProps, mapDispatchToProps, null, { forwardRef: true }
)(Notification)