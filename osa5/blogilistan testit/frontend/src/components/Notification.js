const Notification = (props) => {
  if (props.message === null) {
    return null
  }

  return (
    <div className={props.type}>
      {props.message}
    </div>
  )
}

Notification.displayName = 'Notification'

export default Notification