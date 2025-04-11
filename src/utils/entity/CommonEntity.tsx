import React from 'react';
import { ToastOptions } from 'react-toastify';
import {colors} from '../../constants/Palette'


interface DropDownStyle {
  select?: React.CSSProperties;
  option?:React.CSSProperties;

}
export interface DropdownProps {
  style:DropDownStyle;
  label?: string;
  options: string[];
  text:string;
  onChange: (selected: string) => void;
  className:string;
}

export interface CheckboxProps {
  label: any;
  checked: boolean;
  type: 'checkbox' | 'radio';
  onChange: (checked: boolean) => void;
  name?: string;
  id?: string;
}

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info'; 
  duration?: number; 
  onClose: () => void; 
}

export interface CardProps extends React.HTMLProps<HTMLDivElement> {
  header?: React.ReactNode | string;
  description?: React.ReactNode | string;
  footer?: React.ReactNode | string;
  
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
}


export interface LayoutProps {
  NavbarComponent?: React.ComponentType;
  FooterComponent?: React.ComponentType;
}


export type ToastType = 'success' | 'error' | 'info' | 'warning';
export interface ToastContextProps {
  showToast: (message: string, type: ToastType, duration?: number, options?: ToastOptions) => void;
}


