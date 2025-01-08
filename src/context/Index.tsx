
import * as Yup from 'yup';

export const countries = [
  'India',
  'Singapore',
  'Malaysia',
  'Indonesia',
  'Peru',
  'Colombia',
  'Vietnam',
];

export const navLinks = [
  { name: 'Home', path: '/home' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Services', path: '/services' },
];


export const validationSchema = Yup.object().shape({
   pickupPoint: Yup.string().required('Pickup point is required'), 
   destinationPoint: Yup.string().required('Destination point is required').notOneOf([Yup.ref('pickupPoint')], 
   'Pickup and destination points cannot be the same'),
    pickupDate: Yup.date().required('Pickup date is required'), 
  });