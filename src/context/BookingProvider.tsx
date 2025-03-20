import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Bus } from '../utils/entity/PageEntity';

interface BookingDetails {
  bus: Bus;
  currentSelectedSeats: number[];
  date: string;
  totalAmount: number;
  pickupStop: string;
  droppingStop : string;
}

interface BookingContextType {
  bookingDetails: BookingDetails | null;
  setBookingDetails: React.Dispatch<React.SetStateAction<BookingDetails | null>>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  return (
    <BookingContext.Provider value={{ bookingDetails, setBookingDetails }}>
      {children}
    </BookingContext.Provider>
  );
};


export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
