import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { TripDetailsModalProps } from '../../utils/entity/PageEntity';
import { colors } from '../../constants/Palette';
import PassengerDetailsForm from '../../pages/booking/PassengerDetails';
import { useBooking } from '../../context/BookingProvider';

const TripDetailsCard: React.FC<TripDetailsModalProps> = ({
  show,
  onClose,
  bus,
  currentSelectedSeats = [],
  date,
  selectedPickupPoint,
  selectedDroppingPoint
}) => {
  const { setBookingDetails, bookingDetails } = useBooking();
  const [showPassengerDetailsOffcanvas, setShowPassengerDetailsOffcanvas] = useState(false);
  const totalPrice = bus?.expense * (currentSelectedSeats?.length ?? 0);




  useEffect(() => { }, [])

  const handleProceed = () => {
    if (!currentSelectedSeats) {
      return;
    }

    setBookingDetails({
      bus,
      currentSelectedSeats: currentSelectedSeats.map(Number),
      date,
      totalAmount: totalPrice,
      droppingStop: '',
      pickupStop: '',
      bookingStatus: ''
    });

    setShowPassengerDetailsOffcanvas(true);
  };

  const handleCloseOffcanvas = () => {
    setShowPassengerDetailsOffcanvas(false);
    // if (onClose) {
    //   onClose();
    // }
  };

  return (
    <>
      <div className="card bg-light w-100" style={{ flexShrink: 0, width: '100px' }}>
        <div className="d-flex">
          <h5 className="text-start mx-2 fw-bold">Boarding & Dropping</h5>
          <Button
            className="text-start justify-content-between text-end border-0 fw-bold"
            style={{ background: 'none', color: colors.pagecolor }}
            onClick={onClose}
          >
            Change
          </Button>
        </div>
        <div className="card-body">
          <hr />
          <div className="">
            <h5 className="fw-bold text-start ">{bus?.pickupPoint}</h5>
            <p className="text-secondary text-start">{selectedPickupPoint}
            </p>
          </div>
          <div className="">
            <h5 className="fw-bold text-start">{bus?.droppingPoint}</h5>
            <p className='text-secondary text-start'>{selectedDroppingPoint}</p>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5 className='fw-bold'>Seat No.</h5>
            <h5 className="text-end mx-2">
              {currentSelectedSeats?.length > 0
                ? [...currentSelectedSeats].sort().join(', '): 'None'}</h5>
          </div>
          <hr />
          <div className="">
            <h5 className="fw-bold text-start">Fare Details</h5>
            <span className="d-flex justify-content-between">
              <h5 className=" text-secondary ">Amount:</h5>
              <h5 className='mx-2'>₹{totalPrice}</h5>
            </span>
          </div>
          <div className="d-flex justify-content-center">
            <Button
              className="w-100"
              onClick={handleProceed}
              style={{ backgroundColor: colors.pagecolor, borderColor: colors.pagecolor }}
            >
              Proceed to Booking
            </Button>
          </div>
        </div>
      </div>

      {showPassengerDetailsOffcanvas && (
        <div className="offcanvas offcanvas-end show" tabIndex={-1} id="offcanvasEnd" aria-labelledby="offcanvasEndLabel" style={{ zIndex: 1000, width: '700px' }}>
          <div className="offcanvas-header">
            <h4 className="offcanvas-title fw-bold" id="offcanvasEndLabel">
              Passenger Details
            </h4>
            {/* <Button
              type="button"
              className="btn-close text-reset"
              aria-label="Close"
              onClick={handleCloseOffcanvas}
              style={{ backgroundColor: colors.pagecolor }}
            /> */}
          </div>
          <div className="offcanvas-body" style={{ overflowY: 'auto', maxHeight: '80vh' }}>
            {bookingDetails && <PassengerDetailsForm handleCloseOffcanvas={handleCloseOffcanvas} />}
          </div>
        </div>
      )}
    </>
  );
};

export default TripDetailsCard;