export interface Field {
    type: "number" | "email" | "password" | "search" | "text" | "checkbox" | "url" | "tel"; 
    name: string;
    placeholder?: string; 
    id: string;
    className?: string; 
    label?: string; 
    isCheckbox?: boolean; 
  }