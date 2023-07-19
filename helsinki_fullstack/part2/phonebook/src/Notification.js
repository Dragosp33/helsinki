import React, { useEffect } from 'react';

const Notification = ({ message, visible, onHide, className}) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onHide();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [visible, onHide]);

  return visible ? <div className={className}>{message}</div> : null;
};

export default Notification;
