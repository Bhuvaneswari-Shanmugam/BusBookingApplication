import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetBusesForTripQuery } from '../../redux/services/TripApi';
import Header from '../../components/layout/Header';
import { Bus, BookingDetails } from '../../utils/entity/PageEntity';
import Filters from '../filters/Filters';
import Toast from '../../components/Toast';
import BusCard from '../../components/BusCard';
import Button from '../../components/Button';
import { colors } from '../../constants/Palette';
import { space } from '../../constants/Palette';

const AvailableBuses = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { from, to, date } = location.state || {};
  const aboutCardRef = useRef<HTMLDivElement>(null);
  const formattedDate = new Date(date);
  const { data: buses, isLoading, isError } = useGetBusesForTripQuery({
    pickupPoint: from,
    destinationPoint: to,
    pickupTime: date,
  });
  const [bookedSeats, setBookedSeats] = useState<{ [busId: string]: number[] }>({});
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [viewSeats, setViewSeats] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' | undefined }>({ message: '', type: undefined });
  const [rows, setRows] = useState<(number | null)[][]>([]);

  const formattedDateString = formattedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const availableBuses = Array.isArray(buses?.data) 
  ? buses.data.filter((bus: Bus) => {
      const isSeatsAvailable = !selectedSeats.some((seat) => bookedSeats[bus.id]?.includes(seat));
      return isSeatsAvailable;
    }): [];
    
  const totalBusesCount = availableBuses?.length || 0;

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
      prevSelectedSeats.includes(seatNumber)
        ? prevSelectedSeats.filter((seat) => seat !== seatNumber)
        : [...prevSelectedSeats, seatNumber]
    );
  };

  const totalPrice = selectedSeats.length * (selectedBus?.expense || 0);

  const handleBusClick = (bus: Bus) => {
    if (selectedBus?.number === bus.number) {
      setViewSeats(!viewSeats);
      } else {
      setSelectedBus(bus);
      setViewSeats(true);
    }
  };
  
  if (isLoading) {
    return <div>Loading buses...</div>;
  }
  return (
    <div>
      <Header aboutCardRef={aboutCardRef} />
      <div className="container">
        <div className="d-flex align-items-start mt-5" style={{ marginLeft: '-100px' }}>
          <h5 className="mb-0 mt-5">
            <span className="text-dark">{from} </span>
            <span style={{ color: colors.secondary }}>&rarr; </span>
            <span className="text-dark">{to} </span>
            <span style={{ color: colors.secondary }}>on </span>
            <span className="text-dark">&lt; {formattedDateString} &gt;</span>
          </h5>
          <Button
            className="btn mt-5 ms-3 text-white border-0 p-2"
            style={{ backgroundColor: colors.pagecolor, height: space.xxl, borderRadius: '5px', width: '70px' }}
            onClick={() => navigate('/home')}
          >
            Modify
          </Button>
        </div>

        <div className="d-flex mt-4">
          <div className="col-lg-3 w-25">
            <Filters />
          </div>
          <div className="col-md-8 col-lg-9">
            <div className="d-flex mb-4 mt-2">
              <strong className="ms-3 ">{totalBusesCount} buses </strong> <span className='text-body-tertiary ms-2'>found </span>
              <strong className="ms-3">SORT BY:</strong>
              <h6 className="ms-5 text-body-tertiary mx-3 " >Departure</h6>
              <h6 className="ms-5 text-body-tertiary mx-3 " >Duration</h6>
              <h6 className="ms-5 text-body-tertiary mx-3 ">Arrival </h6>
              <h6 className="ms-5 text-body-tertiary mx-3 ">Ratings</h6>
              <h6 className="ms-5 text-body-tertiary mx-3 ">Fare</h6>
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
                  totalPrice={totalPrice}
                  expense={bus.expense}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
     {toast.message && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: undefined })} />}
    </div>
  );
};

export default AvailableBuses;