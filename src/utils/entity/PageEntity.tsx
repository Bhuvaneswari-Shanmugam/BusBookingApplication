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
  lastName : string;
  userId: string;
  role: string;
}

export interface PassengerDetailsFormProps {
  bookingDetails: {
    bus: Bus;
    currentSelectedSeats: number[];
    date: string;
    totalAmount: number;
  };
}

export const defaultBusValues: Bus = {
  id: 0,
  name: '',
  type: '',
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
  ratings: 0
};


export interface BookingDetails {
  bus: Bus;
  currentSelectedSeats: number[];
  date: string;
  totalAmount: number;
}

export interface Bus {
  id: number;
  name: string;
  type: string;
  departureTime: string;
  departureLocation: string;
  duration: string;
  arrivalTime: string;
  arrivalLocation: string;
  originalPrice: number;
  discountedPrice: number;
  busId: number;
  expense:number;
  number: number;
  pickupPoint: string;
  droppingPoint: string;
  ratings:number;
  tripNumber?:number;
}

export type  ContactDetail = {
  label: string;
  value: string;
  icon: React.ReactNode; 
};

export interface BookingDetails {
  pickupPoint: string;
  destinationPoint: string;
  pickupTime: string;
  busNumber: number;
  busType: string;
  bookedNoOfSeats: number[];
  perSeatAmount: number;
  totalAmount: number;
  userId : string;
}

export interface PointsSelectorProps {
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
  
}

export interface PickUpPointsProps {
  onSelectionChange: (selectedPoints: Set<string>) => void;
  onApply: (selectedPoints: Set<string>) => void;
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
}

export interface InputData {
  pickupPoint: string;
  destinationPoint: string;
  pickupDate: string;
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
  
  export interface Passenger {
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    seatNumber:number;
  }
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
  
  export interface PassengersForTicket {
    firstName: string;
    lastName: string;
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
  title:String;
  fields: FieldConfig[];
  errors: FieldErrors;
  register: any;
  onSubmit: () => void;
  isLoading?: boolean;
  submitButtonText: string;
  forgotPasswordButton?: React.ReactNode;
  signUpLink?: React.ReactNode;
}

export interface SeatDeatils{
  id:Number;
  seatNumber:String;
}

export interface individualPassengerData{
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  seatNumber: number;
}

export interface PassengerData {
  passengers : individualPassengerData[];
  email : string;
  phoneNumber : string;
  ticketId : string;
  busNumber : number;
  
}

export interface PassengerContextType {
  passengers: PassengerData[]; 
  setPassengers: (passengers: PassengerData[]) => void;
  setPassengerDetails: (passenger: PassengerData) => void;
}


export const defaultState: PassengerContextType = {
  passengers: [],
  setPassengers: () => {},
  setPassengerDetails: () => {},
};

export interface TripAction {
  label: string;
  icon: React.ReactNode; 
  handler: (tripId: string) => void;
}
