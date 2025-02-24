import React, { createContext, useContext, useState } from 'react';
import { BookingDetails } from '../utils/entity/PageEntity';

interface BookingContextType {
  bookingDetails: BookingDetails | null;
  setBookingDetails: (details: BookingDetails | null) => void;
}

const BookingContext = createContext<BookingContextType>({
  bookingDetails: null,
  setBookingDetails: () => {}, // Empty function as a placeholder
});

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  return (
    <BookingContext.Provider value={{ bookingDetails, setBookingDetails }}>
      {children}
    </BookingContext.Provider>
  );
};

// ✅ Add this missing export
export const useBookingDetails = () => useContext(BookingContext);
