import { FaUserAlt, FaBus, FaClipboardList, FaTicketAlt, FaChair } from 'react-icons/fa'; 

 export const sidebarList = [
        { path: '/customer-details', label: 'Customer Details', icon: <FaUserAlt /> },
        { path: '/bus-details', label: 'Bus Details', icon: <FaBus /> },
        { path: '/trip-info', label: 'Trip Details', icon: <FaClipboardList /> },
        { path: '/seat', label: 'Seat Details', icon: <FaChair /> },
        { path: '/all-booking-details', label: 'Booking Details', icon: <FaTicketAlt /> },
    ];