import React from 'react';


interface DropDownStyle {
  container?: React.CSSProperties;
  select?: React.CSSProperties;

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

