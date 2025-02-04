import React, { createContext, useContext, useState, ReactNode } from "react";
import {Passenger,PassengerContextType} from '../utils/entity/PassengerInterface';


const PassengerContext = createContext<PassengerContextType | undefined>(undefined);

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

export const usePassenger = (): PassengerContextType => {
  const context = useContext(PassengerContext);
  if (!context) {
    throw new Error("usePassenger must be used within a PassengerProvider");
  }
  return context;
};
