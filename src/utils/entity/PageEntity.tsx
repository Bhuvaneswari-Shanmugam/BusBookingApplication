import { FieldErrors } from 'react-hook-form';

export interface AccessRole {
  getdata: string | number;
  exp?: number;
}

export interface DecodedToken {
  sub: string;
  email: string;
  iat: number;
  exp: number;
  firstName: string;
  userId: string;
  Role: string;
}
export interface BookingDetails {
  pickupPoint: string;
  destinationPoint: string;
  pickupTime: string;
  busNumber: number;
  busType: string;
  bookedNoOfSeats: number[];
  perSeatAmount: number;
  totalAmount: number;
}

export interface LocationPickerProps {
  title: string;
  points: {
    id: number;
    location: string;
  }[];
  selectedPoints: Set<string>;
  onSelectionChange: (selected: Set<string>) => void;
  onApply: (selectedPoints: Set<string>) => void;
}

export interface TripDetailsModalProps {
  show?: boolean;
  onClose?: () => void;
  onProceed?: () => void;
  bus: Bus;
  selectedSeats?: string[];
  totalPrice?: number;
  currentSelectedSeats?: string[];
  selectedPickupPoints?: Set<string>;
  selectedDroppingPoints?: Set<string>;
  date: string;
  bookingDetails?: BookingDetails;
  children?: React.ReactNode;

}

export interface PickUpPointsProps {
  onSelectionChange: (selectedPoints: Set<string>) => void;
  onApply: (selectedPoints: Set<string>) => void;
}

export interface Bus {
  id: number;
  name: string;
  busType: string;
  departureLocation: string;
  duration: string;
  departureTime: string;
  arrivalTime: string;
  arrivalLocation: string;
  originalPrice: number;
  discountedPrice: number;
  busId: number;
  expense: number;
  busCategory:string;
  number: 0,
  pickupPoint: string;
  droppingPoint: string;
  ratings: number;
  tripNumber?: number;
}

export interface BusCardProps {
  bus: Bus;
  from: string;
  to: string;
  date: string;
  expense:number;
  selectedBus: Bus | null;
  selectedSeats: number[];
  bookedSeats: number[];
  viewSeats: boolean;
  rows: (number | null)[][];
  toggleSeatSelection: (seatNumber: number, e: React.MouseEvent) => void;
  handleBusClick: (bus: Bus) => void;
  totalPrice: number;
  genderSeats: {
    femaleSeats: number[];
    maleSeats: number[];
    availableSeats: number[];
  };
}

export interface InputData {
  pickupPoint: string;
  destinationPoint: string;
  pickupDate: string | null;
}



export interface PassengerField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
}

export interface GenderOption {
  id: string;
  value: string;
  label: string;
}

export interface individualPassengerData {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  seatNumber: number;
}

export interface PassengerData {
  passengers: individualPassengerData[];
  email: string;
  phoneNumber: string;
  ticketId: string;
  busNumber: number;

}

export interface PassengerContextType {
  passengers: PassengerData[];
  setPassengers: (passengers: PassengerData[]) => void;
  setPassengerDetails: (passenger: PassengerData) => void;
}


export const defaultState: PassengerContextType = {
  passengers: [],
  setPassengers: () => { },
  setPassengerDetails: () => { },
};

export interface CommonBackgroundProps {
  children: React.ReactNode;
}


export interface FormData {
  passengers?: {
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
  }[];
  email: string;
  phoneNumber: string;
}

export interface PassengerForTicket {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}
export interface Customer {
  name: string;
  email: string;
  phoneNumber: string;
}
export interface TicketState {
  passengers: PassengerForTicket[];
  email: string;
  phoneNumber: string;
}

export interface FieldConfig {
  id: string;
  name: string;
  type: string;
  placeholder?: string;
  label?: string;
  isCheckbox?: boolean;
  className?: string;
}

export interface CommonFormProps {
  title: String;
  fields: FieldConfig[];
  errors: FieldErrors;
  register: any;
  onSubmit: () => void;
  isLoading?: boolean;
  submitButtonText: string;
  forgotPasswordButton?: React.ReactNode;
  signUpLink?: React.ReactNode;
}
export interface SeatDeatils {
  id: Number;
  seatNumber: String;

}

export interface individualPassengerData {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  seatNumber: number;
}
export interface PassengerData {
  passengers: individualPassengerData[];
  email: string;
  phoneNumber: string;
  ticketId: string;
  busNumber: number;

}

export interface PassengerContextType {
  passengers: PassengerData[];
  setPassengers: (passengers: PassengerData[]) => void;
  setPassengerDetails: (passenger: PassengerData) => void;
}



export const defaultBusValues: Bus = {
  id: 0,
  name: '',
  busType: '',
  departureTime: '',
  departureLocation: '',
  duration: '',
  arrivalTime: '',
  arrivalLocation: '',
  originalPrice: 0,
  discountedPrice: 0,
  busId: 0,
  expense: 0,
  number: 0,
  pickupPoint: '',
  droppingPoint: '',
  ratings: 0,
  busCategory:''
};