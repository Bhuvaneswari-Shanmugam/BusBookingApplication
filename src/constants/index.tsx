export const BASE_URL = "http://localhost:8081/api/v1/auth/";

interface Field {
    type: "number" | "email" | "password" | "search" | "text" | "checkbox" | "url" | "tel"; 
    name: string;
    placeholder?: string; 
    id: string;
    className?: string; 
    label?: string; 
    isCheckbox?: boolean; 
  }
  

export const FormFields :Field[]= [
    { name: 'firstName', placeholder: 'First name', type: 'text', className: 'w-48 me-2', id: 'firstName' },
    { name: 'lastName', placeholder: 'Last name', type: 'text', className: 'w-48', id: 'lastName' },
    { name: 'email', placeholder: 'Email', type: 'email', className: 'w-100', id: 'email' },
    { name: 'password', placeholder: 'Password', type: 'password', className: 'w-100', id: 'password' },
    { name: 'role', placeholder: 'Role', type: 'text', className: 'w-100', id: 'role' },
    { name: 'termsAccepted', label: 'I accept the Terms and Conditions', type: 'checkbox', className: 'form-check-input', id: 'termsAccepted', isCheckbox: true },
  ];
  