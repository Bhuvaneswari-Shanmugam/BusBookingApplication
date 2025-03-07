import React, { createContext, useContext, useState } from "react";
import { PassengerContextType, PassengerData } from "../utils/entity/PageEntity";
import {defaultState} from '../utils/entity/PageEntity';

const PassengerContext = createContext<PassengerContextType>(defaultState);

export const PassengerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [passengers, setPassengers] = useState<PassengerData[]>([]);

  const setPassengerDetails = (newPassenger: PassengerData) => {
    setPassengers((prevPassengers) => {
      const existingIndex = prevPassengers.findIndex((p) => p.email === newPassenger.email);

      if (existingIndex !== -1) {
        const updatedPassengers = [...prevPassengers];
        updatedPassengers[existingIndex] = newPassenger;
        return updatedPassengers;
      } else {
        return [...prevPassengers, newPassenger];
      }
    });
  };

  return (
    <PassengerContext.Provider value={{ passengers, setPassengers, setPassengerDetails }}>
      {children}
    </PassengerContext.Provider>
  );
};


export const usePassenger = (): PassengerContextType => useContext(PassengerContext);
