import React from 'react';
import PointsSelector from '../filters/PointSelector';
import { useFetchDroppingPointsQuery } from '../../redux/services/TripApi';

const DroppingPoints: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { data: droppingPoints, error, isLoading } = useFetchDroppingPointsQuery({
    pickupPoint: 'Coimbatore',
    destinationPoint: 'Salem',
    pickupTime: '2025-01-08',
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching dropping points.</p>;

  const validDroppingPoints = Array.isArray(droppingPoints) ? droppingPoints.map(point => ({
    id: point.id,
    name: point.location,
  })) : [];

  return (
    <PointsSelector
      title="DROPPING POINTS"
      points={validDroppingPoints}
      onClose={onClose}
    />
  );
};

export default DroppingPoints;
