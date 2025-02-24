import React from 'react';

interface LabelProps {
  htmlFor?: string;
  className?: string;
  style?: React.CSSProperties; 
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ children, htmlFor, className, style }) => {
  return (
    <label htmlFor={htmlFor} className={className} style={style}>
      {children}
    </label>
  );
};

export default Label;
