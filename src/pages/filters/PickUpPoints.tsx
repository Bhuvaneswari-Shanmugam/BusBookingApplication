import React from 'react';
import { useFetchPickUpPointsQuery } from '../../redux/services/TripApi';
import PointsSelector from '../filters/PointSelector';

const PickUpPoints: React.FC = ()=> {

  const { data: pickupPoints, error, isLoading } = useFetchPickUpPointsQuery({
    pickupPoint: 'Coimbatore',
    destinationPoint: 'Salem',
    pickupTime: '2025-01-08',
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching pickup points.</p>;

  
  const validPickupPoints = Array.isArray(pickupPoints) ? pickupPoints.map(point => ({
    id: point.id,
    name: point.location,
  })) : [];

  return (
    <PointsSelector
      title="PICKUP POINTS"
      points={validPickupPoints}
      
    />
  );
};

export default PickUpPoints;
