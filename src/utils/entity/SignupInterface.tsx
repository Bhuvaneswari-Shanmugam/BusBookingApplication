export interface SignupFormField {
    type: "number" | "email" | "password" | "search" | "text" | "checkbox" | "url" | "tel"; 
    name: string;
    placeholder?: string; 
    id: string;
    className?: string; 
    label?: string; 
    isCheckbox?: boolean; 
  }
  export interface SignupFormInputs {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    termsAccepted: boolean;
}

export interface SignupErrorResponse {
    data: {
      message: string;
    };
  }