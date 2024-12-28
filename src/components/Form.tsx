import React from "react";
import { Form as BootstrapForm } from "react-bootstrap";

interface FormProps {
  className?: string;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ className, onSubmit, children }) => {
  return (
    <BootstrapForm className={className} onSubmit={onSubmit}>
      {children}
    </BootstrapForm>
  );
};

export default Form;
