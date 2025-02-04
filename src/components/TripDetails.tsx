import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { TripDetailsModalProps } from '../utils/entity/PageEntity';
import { colors } from '../constants/Palette';

const TripDetailsModal: React.FC<TripDetailsModalProps> = ({ show, onClose, onProceed, bus, currentSelectedSeats, selectedDroppingPoints, selectedPickupPoints }) => {
  const totalPrice = bus.expense * (currentSelectedSeats?.length || 0);
  
  const renderSelectedPoints = (points: Set<string>) => {
    return Array.from(points).join(', ');
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Boarding & Dropping</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <strong>{bus.departureTime}</strong>
        <span className="d-inline ml-4 justify-content-end">Date</span>
        <br /> */}
        <strong>{bus.pickupPoint}</strong>
        <p className="text-secondary">{renderSelectedPoints(selectedPickupPoints ?? new Set<string>())}</p>
        <strong>{bus.droppingPoint}</strong>
        <p className="text-secondary">{renderSelectedPoints(selectedDroppingPoints ?? new Set<string>())}</p>
        <hr />
        <p>
          <strong>
            <span className="d-inline">Seat No:</span>
          </strong>
          <span className="d-inline ml-4 justify-content-end">
            {(currentSelectedSeats ?? []).length > 0
              ? (currentSelectedSeats ?? []).join(', ')
              : 'None'}
          </span>
        </p>

        <hr />
        <strong>
          <span className="d-inline">Fare Details</span>
        </strong>
        <p>
          <span className="d-inline">Amount</span>
          <span className="d-inline justify-content-end">₹{totalPrice}</span>
        </p>
        <div className="d-flex justify-content-center">
          <Button onClick={onProceed} style={{ backgroundColor: colors.pagecolor }}>
            Proceed Payment
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TripDetailsModal;
