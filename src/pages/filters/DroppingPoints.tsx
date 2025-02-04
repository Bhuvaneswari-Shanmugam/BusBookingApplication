import React, { useState } from 'react';
import { useFetchDroppingPointsQuery } from '../../redux/services/TripApi';
import { useLocation } from 'react-router-dom';
import LocationPicker from '../../components/LocationPicker';

interface DroppingPointsProps {
  onSelectionChange: (selectedPoints: Set<string>) => void;  
  onApply: (selectedPoints: Set<string>) => void;  
}

const DroppingPoints: React.FC<DroppingPointsProps> = ({ onSelectionChange, onApply }) => {
  const location = useLocation();
  const { from, to, date } = location.state || {};
  const { data: droppingPoints, error, isLoading } = useFetchDroppingPointsQuery({
    pickupPoint: from,
    destinationPoint: to,
    pickupTime: date,
  });

const [selectedDroppingPoints, setSelectedDroppingPoints] = useState<Set<string>>(new Set());  

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching dropping points.</p>;

  const validDroppingPoints = Array.isArray(droppingPoints)
    ? droppingPoints.map(point => ({
        id: point.id,  
        location: point.location,
      }))
    : [];

  const handleDroppingSelection = (selected: Set<string>) => {  
    setSelectedDroppingPoints(selected);
    onSelectionChange(selected);
  };

  const handleApply = () => {
    onApply(selectedDroppingPoints);
  };

  return (
    <LocationPicker
      title="DROPPING POINTS"
      points={validDroppingPoints}
      selectedPoints={selectedDroppingPoints}
      onSelectionChange={handleDroppingSelection}
      onApply={handleApply} 
    />
  );
};

export default DroppingPoints;
