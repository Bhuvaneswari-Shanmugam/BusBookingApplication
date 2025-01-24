import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastProps } from '../utils/entity/CommonEntity';


const Toast: React.FC<ToastProps> = ({ message, type = 'info', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  let toastClass = `toast show align-items-center border-0 ${type === 'success' ? 'text-bg-success' : type === 'error' ? 'text-bg-danger' : 'text-bg-light'}`;

  return (
    <div className="position-fixed top-50 end-0 p-3" style={{ transform: 'translateY(-50%)' }}>
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
