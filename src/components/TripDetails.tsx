import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { TripDetailsModalProps } from '../utils/entity/PageEntity';
import { colors } from '../constants/Palette';
import { useNavigate } from 'react-router-dom';

const TripDetailsModal: React.FC<TripDetailsModalProps> = ({
  show,
  onClose,
  bus,
  currentSelectedSeats,
  date,
}) => {
  const [selectedPickupPoints, setSelectedPickupPoints] = useState<Set<string>>(new Set());
  const [selectedDroppingPoints, setSelectedDroppingPoints] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const totalPrice = bus?.expense * (currentSelectedSeats?.length || 0);

  // Function to render selected points (Pickup or Dropping)
  const renderSelectedPoints = (points: Set<string>) => {
    return points.size > 0 ? Array.from(points).join(', ') : 'None';
  };

  // Use useEffect to load selected points from sessionStorage
  useEffect(() => {
    const storedPickupPoints = sessionStorage.getItem('selectedPickupPoints');
    const storedDroppingPoints = sessionStorage.getItem('selectedDroppingPoints');

    if (storedPickupPoints) {
      setSelectedPickupPoints(new Set(JSON.parse(storedPickupPoints)));
    }

    if (storedDroppingPoints) {
      setSelectedDroppingPoints(new Set(JSON.parse(storedDroppingPoints)));
    }
  }, []);

  const handleProceed = () => {
    if (!currentSelectedSeats) {
      console.error('currentSelectedSeats is undefined');
      return;
    }
  
    const bookingDetails = {
      bus,
      currentSelectedSeats,
      date,
      totalAmount: totalPrice,
      bookedNoOfSeats: currentSelectedSeats.length,
    };
    navigate('/passenger-details', { state: { bookingDetails } });
    
  };
  

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Boarding & Dropping</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <strong>Bus No : </strong>
        <span className='mx-2'>{bus?.number}</span>
        <br />
        <strong>Date :</strong>
        <span className='mx-2'>{date}</span>
        <br />
        <strong >{bus?.pickupPoint}</strong>
        <p className="text-secondary">{renderSelectedPoints(selectedPickupPoints)}</p>
        <strong>{bus?.droppingPoint}</strong>
        <p className="text-secondary">{renderSelectedPoints(selectedDroppingPoints)}</p>

        <p>
          <strong>
            <span className="d-inline">Seat No :</span>
          </strong>
          <span className="d-inline ml-4 justify-content-end mx-2">
            {(currentSelectedSeats ?? []).length > 0
              ? (currentSelectedSeats ?? []).join(', ')
              : 'None'}
          </span>
        </p>

        <strong>
          <span className="d-inline">Fare Details</span>
        </strong>
        <p>
          <span className="d-inline ">Amount</span>
          <span className="d-inline justify-content-end mx-2">₹{totalPrice}</span>
        </p>
        <div className="d-flex justify-content-center">
          <Button onClick={handleProceed} style={{ backgroundColor: colors.pagecolor, borderColor: colors.pagecolor }}>
            Proceed to Booking
          </Button>
        </div>
      </Modal.Body>
    </Modal>
    
  );
};

export default TripDetailsModal;
