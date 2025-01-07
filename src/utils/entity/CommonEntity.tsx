import React from 'react';


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

