import React from "react";
import { ButtonInterface } from '../utils/entity/Comentity';
import { Button as BootstrapButton, Container } from "react-bootstrap";  


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
  };
  
  const Button = ({
    className,
    type="button",
    variant,
    size ,
    children,
    onClick,
    color,
    style,
    disabled,
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
          {children}
        </BootstrapButton>
      </Container>
    );
  };
  
  Button.displayName = "Button";
  
  export default Button;
