import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; 
  type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search" | "checkbox"; 
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
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text", 
  placeholder,
  name,
  disabled = false,
  className,
  maxLength,
  minLength,
  pattern,
  required = false,
  autoFocus = false,
  autoComplete = "off",
  ...rest
}) => {
  return (
    <div className="input-wrapper">
      {label && <label htmlFor={name} className="input-label">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        disabled={disabled}
        className={className}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        required={required}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        {...rest} 
      />
    </div>
  );
};

export default Input;
