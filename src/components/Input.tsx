import React from "react";
import Label from '../components/Label';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; 
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
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; 
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
  onChange, 
  ...rest
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event); 
    }
  };

  return (
    <div className="input-wrapper">
      {label && <Label htmlFor={name} className="input-label">{label}</Label>}
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
        onChange={handleChange} 
        id={name} 
        {...rest} 
      />
    </div>
  );
};

export default Input;
