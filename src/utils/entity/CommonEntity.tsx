import React from 'react';
import { colors } from '../../constants/Palette'


export interface DropdownProps {
  label: string;
  options: string[];
  onChange: (selected: string) => void;
}

export interface CheckboxProps {
  label: string;
  checked: boolean;
  type: 'checkbox' | 'radio';
  onChange: (checked: boolean) => void;
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
  title?:  string ;
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

export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; 
  children:React.ReactNode;  
  type?: "button" | "submit" | "reset"; 
  color?: keyof typeof colors; 
  disabled?: boolean; 
  className?: string; 
  variant?: string; 
  size?: "sm" | "lg"; 
  style?: React.CSSProperties; 
  icon?: React.ReactNode; 
  loading?: boolean; 
};

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; 
  type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search" | "checkbox" | "date"; 
  placeholder?: string; 
  name?: string; 
  disabled?: boolean; 
  className?: string; 
  maxLength?: number; 
  minLength?: number; 
  pattern?: string;  
  required?: boolean; 
  autoFocus?: boolean;
  autoComplete?: "on" | "off"; 
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; 
}
