import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useGetBusesForTripQuery } from '../../redux/services/TripApi';
import Header from '../../components/layout/Header';
import { Bus, BookingDetails } from '../../utils/entity/PageEntity';
import Filters from '../filters/Filters';
import Toast from '../../components/Toast';
import BusCard from '../../components/BusCard';
import PassengerDeatilsForm from '../auth/PassengerDetails';

const AvailableBuses = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { from, to, date } = location.state || {};
  const { data: buses, isLoading, isError } = useGetBusesForTripQuery({
    pickupPoint: from,
    destinationPoint: to,
    pickupTime: date
  });
  const [bookedSeats, setBookedSeats] = useState<{ [busId: string]: number[] }>({});
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState<boolean>(false);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [viewSeats, setViewSeats] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' | 'info' | undefined }>({ message: '', type: undefined });
  const [rows, setRows] = useState<(number | null)[][]>([]);
  const [showPassengerDetailsModal, setShowPassengerDetailsModal] = useState<boolean>(false);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);



  const availableBuses = buses?.filter((bus: Bus) => {
    const isSeatsAvailable = !selectedSeats.some(seat => bookedSeats[bus.id]?.includes(seat));
    return isSeatsAvailable;
  });

  useEffect(() => {
    if (selectedBus?.type === 'SLEEPER') {
      setRows([
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [null, null, null, null, null],
        [11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20],
      ]);
    } else {
      setRows([
        [1, 2, 3, 4, 5, 6, 7, 8],
        [9, 10, 11, 12, 13, 14, 15, 16],
        [null, null, null, null, null, null, null, 17],
        [null, null, null, null, null, null, null, 18],
        [19, 20, 21, 22, 23, 24, 25, 26],
        [27, 28, 29, 30, 31, 32, 33, 34],
      ]);
    }
  }, [selectedBus]);

  const toggleSeatSelection = (seatNumber: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookedSeats[selectedBus?.id || '']?.includes(seatNumber)) {
      setToast({ message: 'This seat is already booked.', type: 'error' });
      return;
    }
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatNumber) ?
        prevSelectedSeats.filter((seat) => seat !== seatNumber) :
        [...prevSelectedSeats, seatNumber]
    );
  };

  const totalPrice = selectedSeats.length * 250;

  const handleBusClick = (bus: Bus) => {
    if (selectedBus?.id === bus.id) {
      setViewSeats(!viewSeats);
    } else {
      setSelectedBus(bus);
      setViewSeats(true);
    }
  };

  const handleDownloadTicket = () => { };

  const handlePayment = async () => {
    if (selectedSeats.length > 0) {
      try {
        const bookingDetails: BookingDetails = {
          pickupPoint: from,
          destinationPoint: to,
          pickupTime: date,
          busNumber: Number(selectedBus?.number) || 0,
          busType: selectedBus?.type || 'Non-AC',
          bookedNoOfSeats: selectedSeats,
          perSeatAmount: selectedBus?.discountedPrice || 0,
          totalAmount: totalPrice,
        };

        localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

        setBookedSeats(prev => ({
          ...prev,
          [selectedBus?.id || '']: [...(prev[selectedBus?.id || ''] || []), ...selectedSeats]
        }));

        setBookingDetails(bookingDetails);
        setSelectedSeats([]);

        setShowPassengerDetailsModal(true);
      } catch (error: any) {
        const errorMessage = error?.data?.message || error.message || 'Unknown error occurred';
        setToast({ message: `Booking failed. Reason: ${errorMessage}`, type: 'error' });
      }
    } else {
      setToast({ message: 'Please select at least one seat to proceed with booking.', type: 'error' });
    }
  };

  if (isLoading) {
    return <div>Loading buses...</div>;
  }

  return (
    <div>
      <Header />
      <div className="container d-flex flex-column flex-md-row mt-4">
        <div className="filters-container col-12 col-md-3 p-3">
          <Filters />
        </div>
        <div className="buses-container col-12 col-md-9 p-3 mt-5" style={{ opacity: showPassengerDetailsModal ? 0.5 : 1, pointerEvents: showPassengerDetailsModal ? 'none' : 'auto' }}>
          <div className="d-flex justify-content-start align-items-center mb-4">
            <h5 className="mb-0">
              <strong>{from}</strong> - <strong>{to}</strong> on <strong>{date}</strong>
            </h5>
            <button className="btn ms-3 text-white" style={{ backgroundColor: 'darkorchid' }} onClick={() => navigate('/')}>
              Modify
            </button>
          </div>
          <div>
            <div className="d-flex align-items-center mb-4">
              <h6 className="mb-0">Buses found</h6>
              <strong className="ms-3">SORT BY:</strong>
              <button className="btn ms-4" style={{ color: 'darkorchid' }}>Departure</button>
              <button className="btn ms-3" style={{ color: 'darkorchid' }}>Duration</button>
              <button className="btn ms-3" style={{ color: 'darkorchid' }}>Arrival</button>
            </div>
          </div>
          <div className="row mt-3">
            {availableBuses?.map((bus: any) => (
              <BusCard
                key={bus.id}
                bus={bus}
                from={from}
                to={to}
                date={date}
                selectedBus={selectedBus}
                selectedSeats={selectedSeats}
                bookedSeats={bookedSeats[bus.id] || []}
                viewSeats={viewSeats}
                rows={rows}
                toggleSeatSelection={toggleSeatSelection}
                handleBusClick={handleBusClick}
                handlePayment={handlePayment}
                handleDownloadTicket={handleDownloadTicket}
                totalPrice={totalPrice}
              />
            ))}
          </div>
        </div>
      </div>
      {toast.message && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: undefined })} />}

      {showPassengerDetailsModal && (
        <div className="offcanvas offcanvas-end show" tabIndex={-1} id="offcanvasEnd" aria-labelledby="offcanvasEndLabel" style={{ display: 'block', width: '700px' }}>
          <div className="offcanvas-header">
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => setShowPassengerDetailsModal(false)}></button>
          </div>
          <div className="offcanvas-body" style={{ maxHeight: '95vh' }}>

            {bookingDetails && (
              <PassengerDeatilsForm bookingDetails={bookingDetails} />
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableBuses;
