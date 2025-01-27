import {SignupFormField} from "../utils/entity/SignupInterface";
import {PassengerField,GenderOption, SeatDeatils} from '../utils/entity/PageEntity';

export const SignupFormFields: SignupFormField[] = [
  { name: 'firstName', placeholder: 'First name', type: 'text', className: 'w-48 me-2', id: 'firstName' },
  { name: 'lastName', placeholder: 'Last name', type: 'text', className: 'w-48', id: 'lastName' },
  { name: 'email', placeholder: 'Email', type: 'email', className: 'w-100', id: 'email' },
  { name: 'password', placeholder: 'Password', type: 'password', className: 'w-100', id: 'password' },
  { 
    name: 'role', 
    placeholder: 'Role', 
    type: 'select', 
    className: 'w-100', 
    id: 'role', 
    options: [
      { value: 'CUSTOMER', label: 'Customer' },
      { value: 'ADMIN', label: 'Admin' }
    ]
  },
  { name: 'termsAccepted', label: 'I accept the Terms and Conditions', type: 'checkbox', className: 'form-check-input', id: 'termsAccepted', isCheckbox: true },
];

export const LoginFormFields = [
  { id: 'email', name: 'email', type: 'email', placeholder: 'Email' },
  { id: 'password', name: 'password', type: 'password', placeholder: 'Password' },
];

export const fields: PassengerField[] = [
  { id: 'firstName', label: 'First Name', type: 'text', placeholder: 'Enter first name' },
  { id: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Enter last name' },
  { id: 'age', label: 'Age', type: 'number', placeholder: 'Enter your age' },
];

export const genderOptions: GenderOption[] = [
  { id: 'male', value: 'male', label: 'Male' },
  { id: 'female', value: 'female', label: 'Female' },
];

export const passengers :SeatDeatils []=
[{ id: 1, seatNumber: "A1" },
  {id: 2, seatNumber: "A2" }
];
export const total = 1850.0;