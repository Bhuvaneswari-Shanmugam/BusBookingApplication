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

export interface TableProps<TData> {
  data: TData[];
  columns: any[];
  onRowClick?: (row: TData) => void;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: string;
  description?: string;
  title: string;
  content: any;
  footer?: any;
}
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  icon?: React.ReactNode;
  type?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
}

