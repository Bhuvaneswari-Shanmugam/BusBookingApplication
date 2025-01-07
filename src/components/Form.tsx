import React from "react";
import { Form as BootstrapForm } from "react-bootstrap";

interface FormProps {
  className?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Form: React.FC<FormProps> = ({ className, onSubmit, children,style }) => {
  return (
    <BootstrapForm className={className} onSubmit={onSubmit} style={style}>
      {children}
    </BootstrapForm>
  );
};

export default Form;
