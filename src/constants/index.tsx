
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
  { name: 'Home', path: '/home' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Services', path: '/services' },
];

export const locations = ['Salem', 'Namakkal', 'Chennai', 'Coimbatore', 'Bangalore'];



export interface Bus {
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

export const busData: Bus[] = [
    {
      name: "Sri Vijaya Travels",
      type: "NON-AC",
      departureTime: "10:30",
      departureLocation: "Salem New Bus Stand",
      duration: "07h 00m",
      arrivalTime: "17:30",
      arrivalLocation: "Koyambedu",
      rating: "783",
      originalPrice: 700,
      discountedPrice: 600,
      busId: 1,
    },
    {
      name: "SRS Travels",
      type: "NON-AC",
      departureTime: "11:00",
      departureLocation: "Salem New Bus Stand",
      duration: "08h 30m",
      arrivalTime: "19:30",
      arrivalLocation: "Chennai",
      rating: "912",
      originalPrice: 700,
      discountedPrice: 600,
      busId: 2,
    },
    {
      name: "Guna Travels",
      type: "AC",
      departureTime: "11:00",
      departureLocation: "Salem New Bus Stand",
      duration: "08h 30m",
      arrivalTime: "19:30",
      arrivalLocation: "Koyambedu",
      rating: "912",
      originalPrice: 800,
      discountedPrice: 750,
      busId: 3,
    },
    {
      name: "Sanjay Travels",
      type: "AC",
      departureTime: "11:00",
      departureLocation: "Salem New Bus Stand",
      duration: "08h 30m",
      arrivalTime: "19:30",
      arrivalLocation: "Chennai",
      rating: "912",
      originalPrice: 800,
      discountedPrice: 750,
      busId: 4,
    },
    {
      name: "RMS Travels",
      type: "SLEEPER",
      departureTime: "11:00",
      departureLocation: "Salem New Bus Stand",
      duration: "08h 30m",
      arrivalTime: "19:30",
      arrivalLocation: "Chennai",
      rating: "912",
      originalPrice: 1000,
      discountedPrice: 860,
      busId: 5,
    },
    {
      name:"SS Travels",
      type:"NON-AC",
      departureTime:"12:00",
      departureLocation:"Velur Devi Bakery",
      duration:"05h 30m",
      arrivalTime:"21:30",
      arrivalLocation:"Namakkal",
      rating:"910",
      originalPrice:750,
      discountedPrice:650,
      busId:7,
},
    {
      name: "Abi Travels",
      type: "SLEEPER",
      departureTime: "11:00",
      departureLocation: "Salem New Bus Stand",
      duration: "08h 30m",
      arrivalTime: "19:30",
      arrivalLocation: "Koyambedu",
      rating: "912",
      originalPrice: 1000,
      discountedPrice: 860,
      busId: 6,
    },
  ];

  export const busDetails = [
    {
      title: "Luxury Travel",
      description: "As India's infrastructure continues to evolve, the demand for comfortable and efficient travel options is on the rise. Whether it's long-distance travel, corporate commuting, or tourist excursions, Bigtraze Travels provides the perfect solution.",
      imgSrc: "", 
      imgWidth: "200px",
      imgHeight: "110px",
      alignment: "center"
    },
    {
      title: "AC Bus Travel",
      description: "Bus air conditioners are indispensable for providing a comfortable and enjoyable journey for passengers. Understanding the benefits and maintenance tips associated with bus air conditioners can enhance passenger experience.",
      imgSrc: "", 
      imgWidth: "200px",
      imgHeight: "110px",
      alignment: "center"
    },
    {
      title: "Non-AC Bus Travel",
      description: "The all-new BS VI Range of Starbus comes with unmatched features of excellent seating comfort with wider seats, armrests, mobile chargers, more leg space, reclining seats, improved suspension and reduced NVH, making it convenient and comfortable for passengers.",
      imgSrc: "", 
      imgWidth: "330px",
      imgHeight: "150px",
      alignment: "start"
    }
  ];
  
