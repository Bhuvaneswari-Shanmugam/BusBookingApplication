import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Bus } from '../utils/entity/PageEntity';

// Define the type for booking details
interface BookingDetails {
  bus: Bus;
  currentSelectedSeats: number[];
  date: string;
  totalAmount: number;
}

interface BookingContextType {
  bookingDetails: BookingDetails | null;
  setBookingDetails: React.Dispatch<React.SetStateAction<BookingDetails | null>>;
}

// Create Context with an initial undefined value
const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Provider Component
export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  return (
    <BookingContext.Provider value={{ bookingDetails, setBookingDetails }}>
      {children}
    </BookingContext.Provider>
  );
};

// Custom Hook for using context
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
