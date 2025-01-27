import { FieldErrors } from 'react-hook-form';


export interface PassengerField {
    id: string;
    label: string;
    type: string;
    placeholder: string;
  }
  
  export interface GenderOption {
    id: string;
    value: string;
    label: string;
  }
  
  export interface Passenger {
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    email: string; 
    phoneNumber: string;
  }
  export interface CommonBackgroundProps {
    children: React.ReactNode;
}


  export interface FormData {
    passengers?: {
      firstName: string;
      lastName: string;
      age: number;
      gender: string;
    }[];  
    email: string;
    phoneNumber: string;
  }
  
  export interface PassengerForTicket {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}
export interface Customer {
  name: string;
  email: string;
  phoneNumber: string;
}
export interface TicketState {
  passengers: PassengerForTicket[];
  email: string;
  phoneNumber: string;
}

export interface FieldConfig {
  id: string;
  name: string;
  type: string;
  placeholder?: string;
  label?: string;
  isCheckbox?: boolean;
  className?: string;
}

export interface CommonFormProps {
  title:String;
  fields: FieldConfig[];
  errors: FieldErrors;
  register: any;
  onSubmit: () => void;
  isLoading?: boolean;
  submitButtonText: string;
  forgotPasswordButton?: React.ReactNode;
  signUpLink?: React.ReactNode;
}
export interface SeatDeatils{
  id:Number;
  seatNumber:String;

}