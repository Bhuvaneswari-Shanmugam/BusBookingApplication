import React, { createContext, useContext } from 'react';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sizes, space, palette } from '../constants/ToastPalatte';
import { ToastContextProps, ToastType } from '../../src/utils/entity/CommonEntity';
 
const ToastContext = createContext<ToastContextProps | undefined>(undefined);
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const showToast = (message: string, type: ToastType, duration?: number, options?: ToastOptions) => {
    const toastOptions: ToastOptions = {
      autoClose: duration || 5000,
      style: {
        fontSize: sizes[7],  
        padding: space[7],  
        color: palette.black,
        backgroundColor: palette.white,
      } as React.CSSProperties,
      ...options,
    };
 
    switch (type) {
      case 'success':
        toast.success(message, toastOptions);
        break;
      case 'error':
        toast.error(message, toastOptions);
        break;
      case 'info':
        toast.info(message, toastOptions);
        break;
      case 'warning':
        toast.warning(message, toastOptions);
        break;
      default:
        toast.info(message, toastOptions);
    }
  };
 
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};
 
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
 
 