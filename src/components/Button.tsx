import React from "react";
import { Button as BootstrapButton, Spinner } from "react-bootstrap";
import { colors } from "../constants/Palette";

export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  name?: string;
  children?: React.ReactNode; 
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

const Button = ({
  className,
  type = "button",
  variant,
  size,
  name,
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
      {children || name}
    </BootstrapButton>
  );
};

export default Button;
