import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the types for passenger details
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

// Create the context with a default value
const PassengerContext = createContext<PassengerContextType | undefined>(undefined);

// Provider component
export const PassengerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  return (
    <PassengerContext.Provider value={{ passengers, setPassengers, email, setEmail, phoneNumber, setPhoneNumber }}>
      {children}
    </PassengerContext.Provider>
  );
};

// Custom hook to use the context
export const usePassenger = (): PassengerContextType => {
  const context = useContext(PassengerContext);
  if (!context) {
    throw new Error("usePassenger must be used within a PassengerProvider");
  }
  return context;
};
