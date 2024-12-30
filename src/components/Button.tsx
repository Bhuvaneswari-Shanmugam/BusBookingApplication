import React from "react";
import { Button as BootstrapButton, Container, Spinner } from "react-bootstrap";

export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; 
  children?: React.ReactNode; 
  type?: "button" | "submit" | "reset"; 
  color?: "primary" | "secondary";
  disabled?: boolean; 
  className?: string; 
  variant?: string; 
  size?: "sm" | "lg" | undefined; 
  style?: React.CSSProperties; 
  icon?: React.ReactNode; 
  loading?: boolean; 
};

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
    <Container>
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
    </Container>
  );
};

Button.displayName = "Button";

export default Button;
