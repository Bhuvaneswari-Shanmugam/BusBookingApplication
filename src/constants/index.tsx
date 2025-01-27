import catBus1 from '../assets/cat-bus1.png';
import catBus2 from '../assets/cat-bus2.png'
import catBus3 from  '../assets/cat-bus3.jpg'

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

  export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIiLCJVc2VyRW1haWwiOiIiLCJpYXQiOjE3MzUxNDI2NjYsImV4cCI6MTczNTI0ODg2NiwiRmlyc3ROYW1lIjoiTmFuZGhpbmkiLCJVc2VySWQiOiI2N2UxNGE0My03ZDUxLTQ1ZWUtYmFhZi1lMWNkNzUyNWU4YWQiLCJSb2xlIjoiQURNSU4ifQ.9_cf0yormKJk0_pL2_lhsnPoU-K_ZGDznslS60jRkzQ'; 

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


  
  
