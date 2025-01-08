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
