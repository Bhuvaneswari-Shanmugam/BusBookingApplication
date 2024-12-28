import React, { useEffect } from 'react';
import { ToastProps } from '../utils/entity/CommonEntity';
import 'bootstrap/dist/css/bootstrap.min.css';

const Toast: React.FC<ToastProps> = ({ message, type = 'info', duration = 3000, onClose, }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  let toastClass = 'toast show align-items-center text-bg-light border-0';
  if (type === 'success') toastClass = 'toast show align-items-center text-bg-success border-0';
  else if (type === 'error') toastClass = 'toast show align-items-center text-bg-danger border-0';
  return (
    <div className="position-fixed   top end-0 p-3" style={{ zIndex: 11 }}>
      <div className={toastClass} role="alert" aria-live="assertive" aria-atomic="true">
        <div className="d-flex">
          <div className="toast-body">
            {message}
          </div>
          <button type="button" className="btn-close me-2 m-auto" aria-label="Close" onClick={onClose}></button>
        </div>
      </div>
    </div>
  );
};
export default Toast;
