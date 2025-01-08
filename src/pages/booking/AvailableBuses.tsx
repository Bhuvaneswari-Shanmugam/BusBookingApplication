import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import { Bus, BookingDetails } from '../../utils/entity/PageEntity';
import Filters from '../filters/Filters';
import Toast from '../../components/Toast'
import { busData } from '../../constants';

const AvailableBuses = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bus, from, to, date } = location.state || {};
  const busId = bus?.busId;
  const [bookedSeats, setBookedSeats] = useState<number[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState<boolean>(false);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [viewSeats, setViewSeats] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' | 'info' | undefined }>({ message: '', type: undefined });
  const [rows, setRows] = useState<(number | null)[][]>([]);

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
        [null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [19, 20, 21, 22, 23, 24, 25, 26],
        [27, 28, 29, 30, 31, 32, 33, 34],
      ]);
    }
  }, [selectedBus]);

  const toggleSeatSelection = (seatNumber: number, e: React.MouseEvent) => {
    e.stopPropagation();

    if (bookedSeats.includes(seatNumber)) {
      setToast({ message: 'This seat is already booked.', type: 'error' });
      return;
    }

    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatNumber)
        ? prevSelectedSeats.filter((seat) => seat !== seatNumber)
        : [...prevSelectedSeats, seatNumber]
    );
  };

  const totalPrice = selectedSeats.length * (selectedBus?.discountedPrice || 0);

  const handlePayment = async () => {
    if (selectedSeats.length > 0) {
      try {
        const bookingDetails: BookingDetails = {
          pickupPoint: from,
          destinationPoint: to,
          pickupTime: date,
          busNumber: selectedBus?.busId || 0,
          busType: selectedBus?.type || 'Non-AC',
          bookedNoOfSeats: selectedSeats,
          perSeatAmount: selectedBus?.discountedPrice || 0,
          totalAmount: totalPrice,
        };

        const response = { statusCode: 200, message: 'Booking successful' };

        if (response.statusCode === 200) {
          setToast({ message: `Payment Successful! Total Amount is ₹${totalPrice}`, type: 'success' });
          setBookedSeats((prevBookedSeats) => [...prevBookedSeats, ...selectedSeats]);
          setIsPaymentSuccessful(true);
          setSelectedSeats([]);
          navigate('/home');
        } else {
          setToast({ message: `Booking failed. Reason: ${response.message}`, type: 'error' });
        }
      } catch (error: any) {
        const errorMessage = error?.data?.message || error.message || 'Unknown error occurred';
        setToast({ message: `Booking failed. Reason: ${errorMessage}`, type: 'error' });
      }
    } else {
      setToast({ message: 'Please select at least one seat to proceed with payment.', type: 'error' });
    }
  };

  const handleDownloadTicket = () => {
    if (!isPaymentSuccessful) {
      setToast({ message: 'Please complete the payment before downloading the ticket.', type: 'error' });
    } else if (selectedSeats.length === 0) {
      setToast({ message: 'Please select a seat to download the ticket.', type: 'error' });
    } else {
      setToast({ message: 'Ticket downloaded successfully!', type: 'success' });
    }
  };

  const handleBusClick = (bus: Bus) => {
    if (selectedBus?.busId === bus.busId) {
      setViewSeats(!viewSeats);
    } else {
      setSelectedBus(bus);
      setViewSeats(true);
    }
  };

  return (
    <div>
      <Header />
      <Filters />
      <h5 className="text-center" style={{ marginTop: '50px' }}>
        <strong>{from}</strong> - <strong>{to}</strong> on <strong>{date}</strong>
      </h5>

      <div className="buses-container" style={{ width: '100%', marginTop: '-750px' }}>
        {busData.map((bus) => (
          <div key={bus.busId} className="card p-4 mb-2" style={{ marginLeft: '5 px', marginRight: '0px' }}>
            <div className="card-content d-flex justify-content-between align-items-center">
              <div>
                <h5>{bus.name}</h5>
                <p>{bus.type}</p>
              </div>
              <div>
                <h5>{bus.departureTime}</h5>
                <p>{bus.departureLocation}</p>
              </div>
              <div>
                <h5>{bus.duration}</h5>
              </div>
              <div>
                <h5>{bus.arrivalTime}</h5>
                <p>{bus.arrivalLocation}</p>
              </div>
              <div>
                <img src="" alt="rating-icon" width="70px" height="50px" />
                <h5>👨‍👦‍👦 {bus.rating}</h5>
              </div>
              <div>
                <p>Starts from</p>
                <p>
                  INR <del>{bus.originalPrice}</del> <ins>{bus.discountedPrice}</ins>
                </p>
              </div>
              <button
                onClick={() => handleBusClick(bus)}
                style={{
                  backgroundColor: '#0080FF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  height: '30px',
                  width: '110px',
                }}
              >
                {selectedBus?.busId === bus.busId && viewSeats ? 'Close' : 'View Seats'}
              </button>
            </div>

            <hr style={{ height: '2px', border: 'none', backgroundColor: 'black' }} />

            {selectedBus && selectedBus.busId === bus.busId && viewSeats && (
              <>
                <div className="hide-content d-flex justify-content-around">
                  <div className="card-content" style={{ paddingRight: '10px', marginLeft: '150px' }}>
                    <h4>Booking Summary</h4>
                    {[{ label: 'Bus ID', value: selectedBus.busId }, { label: 'From', value: from }, { label: 'To', value: to }, { label: 'Date', value: date }, { label: 'Bus Type', value: selectedBus.type }, { label: 'Selected Seats', value: selectedSeats.join(', ') || 'None' }, { label: 'Total Price', value: `₹${totalPrice}` }].map(({ label, value }) => (
                      <div className="summary-item" key={label}>
                        <label htmlFor={label}>{label}:</label>
                        <input type="text" id={label} value={value} readOnly />
                      </div>
                    ))}
                    <div className="btn-container d-flex justify-content-between mt-5">
                      <button className="pay-button btn btn-primary" onClick={handlePayment}>
                        To Pay
                      </button>
                      <button className="pay-button btn btn-primary" onClick={handleDownloadTicket}>
                        Download Ticket
                      </button>
                    </div>
                  </div>

                  <div className="bus" style={{ flexGrow: '1', marginTop: '50px' }}>
                    {rows.map((row, rowIndex) => (
                      <div key={rowIndex} className="bus-row">
                        {row.map((seatNumber, seatIndex) =>
                          seatNumber === null ? (
                            <div
                              key={seatIndex}
                              className="empty-space"
                              style={{ width: '40px', height: '40px', margin: '3px' }}
                            />
                          ) : (
                            <img
                              key={seatNumber}
                              src=""
                              alt={`Seat ${seatNumber}`}
                              className={`seat ${selectedSeats.includes(seatNumber) ? 'selected' : ''}`}
                              onClick={(e) => toggleSeatSelection(seatNumber, e)}
                              style={{
                                width: '40px',
                                height: '40px',
                                margin: '3px',
                                cursor: bookedSeats.includes(seatNumber) ? 'not-allowed' : 'pointer',
                                border: selectedSeats.includes(seatNumber)
                                  ? '2px solid green'
                                  : bookedSeats.includes(seatNumber)
                                  ? '2px solid red'
                                  : '2px solid transparent',
                              }}
                            />
                          )
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {toast.message && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: undefined })} />}
    </div>
  );
};

export default AvailableBuses;
