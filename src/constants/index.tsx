import {SignupFormField} from "../utils/entity/SignupInterface";
import { FaEnvelope, FaPhone, FaInstagram,FaFacebook } from 'react-icons/fa';
import catBus1 from '../assets/cat-bus1.png';
import catBus2 from '../assets/cat-bus2.png'
import catBus3 from  '../assets/cat-bus3.jpg'
import {PassengerField,GenderOption, SeatDeatils} from '../utils/entity/PageEntity';
import canada from '../assets/canada.jpg';
import china from '../assets/china.jpg';
import denmark from '../assets/denmark.jpg';
import france from '../assets/france.jpg';
import germany from '../assets/germany.jpg';
import india from '../assets/india.jpg';
import greece from '../assets/greece.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import { TripAction } from '../utils/entity/TripInterface'; 

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



export const aboutContent = [
  "Welcome to BigStanz! Your reliable partner for bus travel bookings. Whether you're commuting for work, embarking on a weekend getaway, or traveling for leisure, our app ensures you can easily find, book, and manage your bus tickets with just a few taps.",
  "At BigStanz, we prioritize your convenience and safety. We offer multiple secure payment options, including credit/debit cards, e-wallets, and UPI, making it simple and safe to pay for your bus tickets. Rest assured, your payment information is encrypted to ensure a secure transaction every time.",
  "Our user-friendly app not only streamlines the booking process but also provides real-time updates on bus schedules and routes. With BigStanz, you can say goodbye to long queues and last-minute hassles.",
  "Join our community of happy travelers and experience seamless bus travel bookings with BigStanz today!"
];


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
  { 
    label: "Email", 
    value: "bigtranzriders@gmail.com",
    icon: <FaEnvelope color="#d44638" />
  },
  { 
    label: "Phone", 
    value: "+1 (234) 567-890-987",
    icon: <FaPhone color="#34b7f1" />
  },
  {
    label: "Facebook", 
    value: "BigStanzRiders",
    icon: <FaFacebook color="#1877f2" />
  },
  {
    label: "Insta", 
    value: "BigStanz_Booking",
    icon: <FaInstagram color="#e1306c" />
  }
 
];


export const services = [
  {
    name: 'Sleeper Bus Service',
    description: 'Experience the comfort of our Sleeper Bus Service. These buses are equipped with reclining seats that convert into cozy beds, perfect for long-distance travel. Enjoy a restful journey and arrive at your destination refreshed and ready to go.'
  },
  {
    name: 'AC and Non-AC Service',
    description: 'Our fleet offers both Air-Conditioned (AC) and Non-Air-Conditioned (Non-AC) bus options to cater to your preferences and budget. Travel in comfort with our AC buses, which provide a cool and pleasant environment even during the hottest days. Alternatively, choose our Non-AC buses for a more economical travel experience.'
  },
  {
    name: 'Luxury Bus Services',
    description: 'Indulge in the ultimate travel experience with our Luxury Bus Services. These premium buses are designed to provide maximum comfort and convenience, featuring spacious seating, entertainment systems, onboard refreshments, and top-notch service. Ideal for travelers who seek a luxurious and enjoyable journey.'
  }
];


export const navLinks = [
  { name: 'Home', to: '' },
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



  export const countryImages : Country[]= [
    { src: canada, alt: "Canada" },
    { src: china, alt: "China" },
    { src: denmark, alt: "Denmark" },
    { src: france, alt: "France" },
    { src: germany, alt: "Germany" },
    {src: greece, alt: "Greece"},
    {src: india, alt: "India"},
  ];
  
  export interface Country  {
    src: string;
    alt: string;
  };
  
  
  export const userProfilefields = [
    { name: 'firstName', type: 'text', label: 'First Name' },
    { name: 'lastName', type: 'text', label: 'Last Name' },
    { name: 'email', type: 'email', label: 'Email' },
    { name: 'age', type: 'number', label: 'Age' },
    { name: 'gender', type: 'select', label: 'Gender', options: ['male', 'female', 'other'] },
    { name: 'phoneNumber', type: 'tel', label: 'Phone Number' },
    { name: 'address', type: 'text', label: 'Address' },
  ];



export const busFormFields = [
  { label: 'Bus Number', name: 'number', type: 'text', placeholder: 'Enter Bus Number' },
  { label: 'Trip Number', name: 'tripNumber', type: 'text', placeholder: 'Enter Trip Number' },
  { label: 'Bus Type', name: 'type', type: 'text', placeholder: 'Enter Bus Type' },
  { label: 'Capacity', name: 'capacity', type: 'number', placeholder: 'Enter Capacity', min: '1' },
  { label: 'Bus Name', name: 'name', type: 'text', placeholder: 'Enter Bus Name' },
  { label: 'Departure Time', name: 'departureTime', type: 'text', placeholder: 'Enter Departure Time' },
  { label: 'Pickup Point', name: 'pickupPoint', type: 'text', placeholder: 'Enter Pickup Point' },
  { label: 'Duration', name: 'duration', type: 'text', placeholder: 'Enter Duration' },
  { label: 'Arrival Time', name: 'arrivalTime', type: 'text', placeholder: 'Enter Arrival Time' },
  { label: 'Dropping Point', name: 'droppingPoint', type: 'text', placeholder: 'Enter Dropping Point' },
  { label: 'Expense', name: 'expense', type: 'number', placeholder: 'Enter Expense', min: '0' },
  { label: 'Ratings', name: 'ratings', type: 'number', placeholder: 'Enter Ratings', min: '1', max: '5', step: '0.1' },
];


export const tripActions = (
  tripId: string,
  onDelete: (tripId: string) => void
): TripAction[] => [

  {
      label: "Delete",
      icon: <FontAwesomeIcon icon={faTrash} color="#dc3545" />,
      handler: () => onDelete(tripId),
  },
];

export interface TripAction {
  label: string;
  icon: React.ReactNode; 
  handler: (tripId: string) => void;
}


export const sortOptions =[
  {label:'Departure', value:'departureTime'},
  {label:'Duration', value:'duration'},
  {label:'Arrival', value:'arrival'},
  {label:'Ratings', value:'ratings'},
  {label:'Expense', value:'expense'},
]