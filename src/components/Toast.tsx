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
    <div className="position-fixed top-0 end-0 p-3 mt-3">
      <div className={toastClass} role="alert" aria-live="assertive" aria-atomic="true">
        <div className="d-flex">
          <div className="toast-body">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
