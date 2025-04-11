import { FaUserAlt, FaBus, FaClipboardList, FaTicketAlt, FaChair } from 'react-icons/fa'; 

 export const sidebarList = [
        { path: '/customer-details', label: 'Customer Details', icon: <FaUserAlt /> },
        { path: '/all-booking-details', label: 'Booking Details', icon: <FaTicketAlt /> },
        { path: '/bus-details', label: 'Bus Details', icon: <FaBus /> },
        { path: '/trip-info', label: 'Trip Details', icon: <FaClipboardList /> },
  ];


  export   const busFormFields = [
      { name: 'number', label: 'Bus Number', type: 'text', inputMode:'numeric' },
      { name: 'tripNumber', label: 'Trip Number', type: 'text'},
      { name: 'name', label: 'Bus Name', type: 'text'},
      { name: 'busType', label: 'Bus Type', type: 'text'},
      { name: 'busCategory', label: 'Bus Category', type: 'text'},
      { name: 'arrivalTime', label: 'Arrival Time', type: 'time'},
      { name: 'departureTime', label: 'Departure Time', type: 'time'},
      { name: 'pickupPoint', label: 'Pickup Point', type: 'text'},
      { name: 'droppingPoint', label: 'Dropping Point', type: 'text'},
      { name: 'expense', label: 'Expense', type: 'text', inputMode:'numeric'},
      { name: 'ratings', label: 'Ratings', type: 'number'},
      { name: 'busRegistrationNumber', label: 'Registration Number', type: 'text' },
    ];


export const tripFormFields =[
      {name:'tripNumber', inputMode:'numeric', label:'Trip Number' , type:'text'},
      {name:'pickupTime', label:'Pickup Time', type:'datetime-local'},
      {name:'reachingTime', label: 'Reaching Time', type:'datetime-local'},
      {name:'droppingPoint', label:'Dropping Point', type:'text'},
      {name:'pickupPoint', label:'Pickup Point', type:'text'},
   ]