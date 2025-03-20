import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { TripDetailsModalProps } from '../utils/entity/PageEntity';
import { colors } from '../constants/Palette';
import PassengerDetailsForm from '../pages/auth/PassengerDetails';
import { useBooking } from '../context/BookingProvider';

const TripDetails: React.FC<TripDetailsModalProps> = ({
  show,
  onClose,
  bus,
  currentSelectedSeats = [],
  date,

}) => {
  const { setBookingDetails, bookingDetails } = useBooking();
  const [selectedPickupPoints, setSelectedPickupPoints] = useState<Set<string>>(new Set());
  const [selectedDroppingPoints, setSelectedDroppingPoints] = useState<Set<string>>(new Set());
  const [showPassengerDetailsOffcanvas, setShowPassengerDetailsOffcanvas] = useState(false);
  const [storedPickupPoints, setStoredPickupPoints] = useState('');
  const [storedDroppingPoints, setStoredDroppingPoints] = useState('');
  const totalPrice = bus?.expense * (currentSelectedSeats?.length ?? 0);

  useEffect(() => {
    const pickupPoints = sessionStorage.getItem('selectedPickupPoints');
    const droppingPoints = sessionStorage.getItem('selectedDroppingPoints');

    if (pickupPoints) {
      setStoredPickupPoints(pickupPoints);
      setSelectedPickupPoints(new Set(JSON.parse(pickupPoints)));
    }

    if (droppingPoints) {
      setStoredDroppingPoints(droppingPoints);
      setSelectedDroppingPoints(new Set(JSON.parse(droppingPoints)));
    }
  }, []);



  const handleProceed = () => {
    if (!currentSelectedSeats) {
      console.error('currentSelectedSeats is undefined');
      return;
    }


    // Store data in Context instead of local state
    setBookingDetails({
      bus,
      currentSelectedSeats: currentSelectedSeats.map(Number),
      date,
      totalAmount: totalPrice,
      pickupStop: storedPickupPoints,   
      droppingStop: storedDroppingPoints,
    });
    console.log("trip context stored ",bookingDetails);

    setShowPassengerDetailsOffcanvas(true);
    if (onClose) {
      onClose();
    }
  };

  const handleCloseOffcanvas = () => {
    setShowPassengerDetailsOffcanvas(false);
  };

  return (
    <>
      {/* Trip Details Modal */}
      <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Boarding & Dropping</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>Bus No: </strong>
          <span className='mx-2'>{bus?.number}</span>
          <br />
          <strong>Date:</strong>
          <span className='mx-2'>{date}</span>
          <br />
          <strong>{bus?.pickupPoint}</strong>
          <p className="text-secondary">
            {selectedPickupPoints.size > 0 ? Array.from(selectedPickupPoints).join(', ') : 'None'}
          </p>
          <strong>{bus?.droppingPoint}</strong>
          <p className="text-secondary">
            {selectedDroppingPoints.size > 0 ? Array.from(selectedDroppingPoints).join(', ') : 'None'}
          </p>

          <p>
            <strong>Seat No:</strong>
            <span className="d-inline mx-2">
              {currentSelectedSeats?.length > 0 ? currentSelectedSeats.join(', ') : 'None'}
            </span>
          </p>

          <strong>Fare Details</strong>
          <p>
            <span>Amount:</span>
            <span className="d-inline mx-2">₹{totalPrice}</span>
          </p>

          <div className="d-flex justify-content-center">
            <Button
              onClick={handleProceed}
              style={{ backgroundColor: colors.pagecolor, borderColor: colors.pagecolor }}
            >
              Proceed to Booking
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {showPassengerDetailsOffcanvas && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div
            className="offcanvas offcanvas-end show"
            tabIndex={-1}
            id="offcanvasEnd"
            aria-labelledby="offcanvasEndLabel"
            style={{ display: 'block', width: '700px', height: 'auto', zIndex: 1050 }}
          >
            <div className="offcanvas-header">
              <h4 className="offcanvas-title  fw-bold" id="offcanvasEndLabel">
                Passenger Details
              </h4>
              <Button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={handleCloseOffcanvas}
                style={{ backgroundColor: colors.pagecolor }}
              ></Button>
            </div>
            <div className="offcanvas-body" style={{ overflowY: 'auto', maxHeight: '80vh' }}>
              {bookingDetails && <PassengerDetailsForm />}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TripDetails;
