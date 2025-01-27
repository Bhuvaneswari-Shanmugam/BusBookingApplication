import React, { useState } from 'react';
import { useFetchPickUpPointsQuery } from '../../redux/services/TripApi';
// import {LocationPicker} from '../../components/LocationPicker';
import { useLocation } from 'react-router-dom';
import { PickUpPointsProps } from '../../utils/entity/PageEntity';
import LocationPicker from '../../components/LocationPicker';

const PickUpPoints: React.FC<PickUpPointsProps> = ({ onSelectionChange, onApply }) => {
  const location = useLocation();
  const { from, to, date } = location.state || {};
  const { data: pickupPoints, error, isLoading } = useFetchPickUpPointsQuery({
    pickupPoint: from,
    destinationPoint: to,
    pickupTime: date,
  });

  const [selectedPickupPoints, setSelectedPickupPoints] = useState<Set<string>>(new Set()); 

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching pickup points.</p>;

  const validPickupPoints = Array.isArray(pickupPoints)
    ? pickupPoints.map(point => ({
        id: point.id,
        location: point.location,
      }))
    : [];

  const handlePickupSelection = (selected: Set<string>) => { 
    setSelectedPickupPoints(selected);
    onSelectionChange(selected);
  };

  const handleApply = () => {
    onApply(selectedPickupPoints);
  };

  return (
    <LocationPicker
      title="PICKUP POINTS"
      points={validPickupPoints}
      selectedPoints={selectedPickupPoints}
      onSelectionChange={handlePickupSelection}
      onApply={handleApply} 
    />
  );
};

export default PickUpPoints;
