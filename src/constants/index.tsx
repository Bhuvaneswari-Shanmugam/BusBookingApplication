import {Field} from "../utils/entity/FormFieldInterface";
import {PassengerField,GenderOption} from '../utils/entity/PageEntity';

export const BASE_URL = "http://localhost:8081/api/v1/auth/";
  

export const FormFields: Field[] = [
  { name: 'firstName', placeholder: 'First name', type: 'text', className: 'w-48 me-2', id: 'firstName' },
  { name: 'lastName', placeholder: 'Last name', type: 'text', className: 'w-48', id: 'lastName' },
  { name: 'email', placeholder: 'Email', type: 'email', className: 'w-100', id: 'email' },
  { name: 'password', placeholder: 'Password', type: 'password', className: 'w-100', id: 'password' },
  { name: 'role', placeholder: 'Role', type: 'text', className: 'w-100', id: 'role' },
  { name: 'termsAccepted', label: 'I accept the Terms and Conditions', type: 'checkbox', className: 'form-check-input', id: 'termsAccepted', isCheckbox: true },
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