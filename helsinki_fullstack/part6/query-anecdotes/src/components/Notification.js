import { useEffect } from "react"
import { useNotificationDispatch, useNotificationValue } from "../reducers/notificationContext"

const Notification = () => {
  const value = useNotificationValue()
  const dispatch = useNotificationDispatch()

  useEffect(() => {
    if (value) {
      const timer = setTimeout(() => {
        dispatch({ type: 'clearNotification' });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [value, dispatch]);

  return (
    <div className="notification-container">
      {value && <div className="notification">{value}</div>}
    </div>
  );
};


  /*
  const dispatch = useNotificationDispatch()
  const value = useNotificationValue()
  const sleep = ms => new Promise(resolve => {
    setTimeout(
        () => {resolve()},
        ms
    );
  });
  // useEffect
  useEffect(() => {
    if (value) {
      const timer = setTimeout(() => {
        dispatch({ type: 'clearNotification' });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [state.message, dispatch]);

  useNotificationDispatch({type: "setNotification", payload: message});
  sleep(5000)
  useNotificationDispatch({type: "clearNotification"})

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (useNotificationValue() === ''){
    return null
  }



  return (
    <div style={style}>
      {message}
    </div>
  )
}
*/
export default Notification
