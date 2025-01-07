import React from "react";
import { Button as BootstrapButton, Container, Spinner } from "react-bootstrap";
import { ButtonProps } from "../utils/entity/CommonEntity";


const Button = ({
  className,
  type = "button",
  variant,
  size,
  children,
  onClick = () => {},
  color,
  style,
  disabled,
  icon,
  loading = false,
  ...props
}: ButtonProps) => {
  return (
 <BootstrapButton
        className={className}
        onClick={onClick}
        type={type}
        style={style}
        variant={variant}
        size={size}
        disabled={disabled}
        {...props}
      >
  
        {loading && (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="me-2"
          />
        )}
        {icon && !loading && <span className="me-2">{icon}</span>}
        {children}
      </BootstrapButton>

  );
}

export default Button;
