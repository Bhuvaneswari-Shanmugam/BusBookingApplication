import React from 'react';
import { BusFilterProvider } from '../../context/BusFilterProvider';
import AvailableBuses from './AvailableBuses';

const MainBus: React.FC = () => {
  return (
    <BusFilterProvider>
      <AvailableBuses />
    </BusFilterProvider>
  );
};

export default MainBus;
