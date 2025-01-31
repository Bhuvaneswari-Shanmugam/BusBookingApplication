import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for the booking details
interface BookingDetails {
  pickupPoint: string;
  destinationPoint: string;
  pickupTime: string;
  busNumber: number;
  busType: string;
  bookedNoOfSeats: number[];
  perSeatAmount: number;
  totalAmount: number;
}

// Define types for the context value
interface BookingContextType {
  bookingDetails: BookingDetails | null;
  updateBookingDetails: (details: BookingDetails) => void;
}

// Create context with an initial value
const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Custom hook to use the context
export const useBookingContext = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookingContext must be used within a BookingProvider');
  }
  return context;
};

// Define the provider component
interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  // Method to update booking details
  const updateBookingDetails = (details: BookingDetails) => {
    setBookingDetails(details);
  };

  return (
    <BookingContext.Provider value={{ bookingDetails, updateBookingDetails }}>
      {children}
    </BookingContext.Provider>
  );
};
