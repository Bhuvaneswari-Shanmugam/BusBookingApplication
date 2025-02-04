import { BookingDetails } from "./PageEntity";


export interface PassengerDetailsFormProps {
  bookingDetails: BookingDetails;
}

// for passenger provider context
export interface Passenger {
  firstName: string;
  lastName: string;
  age: number | undefined;
  gender: string;
}

export interface PassengerContextType {
  passengers: Passenger[];
  setPassengers: (passengers: Passenger[]) => void;
  email: string;
  setEmail: (email: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
}