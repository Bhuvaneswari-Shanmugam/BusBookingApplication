import {SignupFormField} from "../utils/entity/SignupInterface";
import catBus1 from '../assets/cat-bus1.png';
import catBus2 from '../assets/cat-bus2.png'
import catBus3 from  '../assets/cat-bus3.jpg'
import {PassengerField,GenderOption, SeatDeatils} from '../utils/entity/PageEntity';
import Checkbox from "../components/CheckBox";

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


export const countries = [
  'India',
  'Singapore',
  'Malaysia',
  'Indonesia',
  'Peru',
  'Colombia',
  'Vietnam',
];

export const contactDetails = [
  { label: "Email", value: "support@bigtrazetravels.com" },
  { label: "Phone", value: "+1 (234) 567-890" },
  { label: "Address", value: "123 Bigtraze Travels Ave, City, State, ZIP" }
];

export const services = ['Sleeper Bus Service', 'AC and Non-AC Service', 'Luxury Bus Services'];

export const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/' },
  { name: 'Contact', to: '/' },
  { name: 'Services', to: '/' },
];

export const locations = ['Salem', 'Namakkal', 'Chennai', 'Coimbatore', 'Bangalore'];

export const busDetails = [
    {
      title: "Luxury Travel",
      description: "As India's infrastructure continues to evolve, the demand for comfortable and efficient travel options is on the rise. Whether it's long-distance travel, corporate commuting, or tourist excursions, Bigtraze Travels provides the perfect solution.",
      imgSrc: catBus1, 
      imgWidth: "200px",
      imgHeight: "110px",
      alignment: "center"
    },
    {
      title: "AC Bus Travel",
      description: "Bus air conditioners are indispensable for providing a comfortable and enjoyable journey for passengers. Understanding the benefits and maintenance tips associated with bus air conditioners can enhance passenger experience.",
      imgSrc: catBus2, 
      imgWidth: "200px",
      imgHeight: "110px",
      alignment: "center"
    },
    {
      title: "Non-AC Bus Travel",
      description: "The all-new BS VI Range of Starbus comes with unmatched features of excellent seating comfort with wider seats, armrests, mobile chargers, more leg space, reclining seats, improved suspension and reduced NVH, making it convenient and comfortable for passengers.",
      imgSrc: catBus3, 
      imgWidth: "330px",
      imgHeight: "150px",
      alignment: "start"
    }
  ];

  
  interface Bus {
    name: string;
    type: string;
    departureTime: string;
    departureLocation: string;
    duration: string;
    arrivalTime: string;
    arrivalLocation: string;
    rating: string;
    originalPrice: number;
    discountedPrice: number;
    busId: number;
  }


  
  
