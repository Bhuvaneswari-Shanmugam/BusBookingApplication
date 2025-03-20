import { FaEnvelope, FaPhone, FaFacebook, FaInstagram, FaUserAlt, FaBus, FaClipboardList, FaTicketAlt } from "react-icons/fa";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { SignupFormField } from "../utils/entity/SignupInterface";
import catBus1 from '../assets/cat-bus1.png';
import catBus2 from '../assets/cat-bus2.png'
import catBus3 from '../assets/cat-bus3.jpg'
import { PassengerField, GenderOption, SeatDeatils } from '../utils/entity/PageEntity';
import Checkbox from "../components/CheckBox";
import canada from '../assets/canada.jpg';
import china from '../assets/china.jpg';
import denmark from '../assets/denmark.jpg';
import france from '../assets/france.jpg';
import germany from '../assets/germany.jpg';
import india from '../assets/india.jpg';
import greece from '../assets/greece.jpg';
import { ContactDetail } from "../utils/entity/PageEntity";
import { TripAction } from "../utils/entity/PageEntity";


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
  { name: 'termAccepted', label: 'I accept the Terms and Conditions', type: 'checkbox', className: 'form-check-input', id: 'termsAccepted', isCheckbox: true },
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
  { id: 'others', value: 'others', label: 'Others' },
];

export const passengers: SeatDeatils[] =
  [{ id: 1, seatNumber: "A1" },
  { id: 2, seatNumber: "A2" }
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


export const countryImages: Country[] = [
  { src: canada, alt: "Canada" },
  { src: china, alt: "China" },
  { src: denmark, alt: "Denmark" },
  { src: france, alt: "France" },
  { src: germany, alt: "Germany" },
  { src: greece, alt: "Greece" },
  { src: india, alt: "India" },
];

export interface Country {
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
export const termsAndConditions = [
  {
    content: "Arrival Time: Passengers must arrive at least 30 minutes before the scheduled departure time. This allows for sufficient time to complete the boarding process and avoid delays. Arriving early also helps ensure that all passengers can comfortably board the bus without any rush or confusion.",
  },
  {

    content: "ID Verification: It is mandatory to carry a valid photo ID proof during the journey. The ticket and the ID will be verified before boarding to ensure the safety and security of all passengers. Without a valid ID, boarding will not be allowed, and no refunds will be provided.",
  },
  {

    content: "No Refunds: Once a ticket has been issued and the payment has been processed, the ticket is non-refundable. In case of cancellations, no amount will be refunded, regardless of the reason for cancellation. Please ensure you are committed to the journey before booking the ticket.",
  },
  {

    content: "Lost or Stolen Items: The bus company is not responsible for any lost or stolen belongings during the journey. Passengers are advised to keep their personal belongings safe and secure at all times. It is recommended to avoid carrying valuables unless necessary.",
  },
  {

    content: "Safety Guidelines: Passengers must adhere to all safety guidelines provided by the bus company during the trip. This includes following instructions from the staff, wearing seat belts (if provided), and staying seated during the journey for your safety and the safety of others.",
  },
  {

    content: "Prohibited Items: Smoking, consuming alcohol, or engaging in any inappropriate behavior is strictly prohibited on the bus. Passengers who violate these rules may be asked to leave the bus at the nearest stop without any refund. The company reserves the right to take further legal action if necessary.",
  },
  {

    content: "Trip Cancellation or Rescheduling: The company reserves the right to cancel or reschedule the trip due to unforeseen circumstances, such as technical issues, weather conditions, or other emergencies. In such cases, passengers will be informed in advance, and alternate arrangements will be made where possible.",
  },
  {

    content: "Behavior During the Journey: Passengers must follow the instructions of the bus staff and behave respectfully during the trip. Any form of harassment, disturbance, or inappropriate behavior towards fellow passengers or staff will not be tolerated and may lead to removal from the bus.",
  },
];
export const contactDetails: ContactDetail[] = [
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


export const aboutContent = [
  "Welcome to BigStanz! Your reliable partner for bus travel bookings. Whether you're commuting for work, embarking on a weekend getaway, or traveling for leisure, our app ensures you can easily find, book, and manage your bus tickets with just a few taps.",
  "At BigStanz, we prioritize your convenience and safety. We offer multiple secure payment options, including credit/debit cards, e-wallets, and UPI, making it simple and safe to pay for your bus tickets. Rest assured, your payment information is encrypted to ensure a secure transaction every time.",
  "Our user-friendly app not only streamlines the booking process but also provides real-time updates on bus schedules and routes. With BigStanz, you can say goodbye to long queues and last-minute hassles.",
  "Join our community of happy travelers and experience seamless bus travel bookings with BigStanz today!"
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
  export const sidebarList = [
    { path: '/customer-details', label: 'Customer Details', icon: <FaUserAlt /> },
    { path: '/bus-details', label: 'Bus Details', icon: <FaBus /> },
    { path: '/trip-info', label: 'Trip Details', icon: <FaClipboardList /> },
    { path: '/all-booking-details', label: 'Booking Details', icon: <FaTicketAlt /> },
];