import React, { useState } from 'react';

const BusFilterContext = React.createContext({
  filters: {
    busType: '',
    timeSlot: '',
    expenseRange: '',
    ratingRange: '',
    selectedPickupPoints: new Set<string>(),
    selectedDroppingPoints: new Set<string>(),
  },
  setFilters: (filters: any) => {}
});

const BusFilterProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [filters, setFilters] = useState({
    busType: '',
    timeSlot: '',
    expenseRange: '',
    ratingRange: '',
    selectedPickupPoints: new Set<string>(),
    selectedDroppingPoints: new Set<string>(),
  });

  return (
    <BusFilterContext.Provider value={{ filters, setFilters }}>
     {children}
    </BusFilterContext.Provider>
  );
};

export { BusFilterContext, BusFilterProvider };


