import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetBusesForTripQuery } from '../../redux/services/TripApi';
import { useRetrieveGenderListQuery } from '../../redux/services/PassengerDetailsApi';
import { Bus } from '../../utils/entity/PageEntity';
import Filters from '../filters/Filters';
import BusCard from '../../components/BusCard';
import Button from '../../components/Button';
import { colors } from '../../constants/Palette';

const AvailableBuses = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { from, to, date } = location.state || {};
  const formattedDate = new Date(date);
  const [bookedSeats, setBookedSeats] = useState<{ [busId: string]: number[] }>({});
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [viewSeats, setViewSeats] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' | undefined }>({ message: '', type: undefined });
  const [genderSeats, setGenderSeats] = useState<{ femaleSeats: number[]; maleSeats: number[]; availableSeats: number[] }>({ femaleSeats: [], maleSeats: [], availableSeats: [] });
  const [rows, setRows] = useState<(number | null)[][]>([]);

  const { data: genderListData, isLoading: isGenderListLoading } = useRetrieveGenderListQuery(selectedBus?.number || '', {
    skip: !selectedBus?.number,
  });


  const [checkedState, setCheckedState] = useState({
    before6AM: false,
    sixTo12PM: false,
    twelveTo6PM: false,
    after6PM: false,
  });
  const [busTypeState, setBusTypeState] = useState({
    seater: false,
    sleeper: false,
    ac: false,
    nonAc: false,
  });
  const [expenseState, setExpenseState] = useState({
    below500: false,
    between500and1000: false,
    above1000: false,
  });
  const [ratingsState, setRatingsState] = useState({
    below4: false,
    above4: false,
    above4_5: false,
    perfect5: false,
  });

  const { data: buses, isLoading, isError } = useGetBusesForTripQuery({
    pickupPoint: from,
    destinationPoint: to,
    pickupTime: date,
    busType: busTypeState.seater ? 'Seater' : busTypeState.sleeper ? 'Sleeper' : busTypeState.ac ? 'AC' : busTypeState.nonAc ? 'Non-AC' : undefined,
    timeSlot: checkedState.before6AM ? 'Before 6 AM' : checkedState.sixTo12PM ? '6AM-12 PM' : checkedState.twelveTo6PM ? '12PM-6PM' : checkedState.after6PM ? 'After 6PM' : undefined,
    expenseRange: expenseState.below500 ? 'Below ₹500' : expenseState.between500and1000 ? '₹500 - ₹1000' : expenseState.above1000 ? 'Above ₹1000' : undefined,
    ratingRange: ratingsState.below4 ? 'below4' : ratingsState.above4 ? '4.0 and above' : ratingsState.above4_5 ? '4.5 and above' : ratingsState.perfect5 ? '5.0 (Perfect)' : undefined,
  });

  const availableBuses = Array.isArray(buses?.data) ? buses.data : [];
  const handleBusClick = (bus: Bus) => {
    if (selectedBus?.number === bus.number) {
      setViewSeats(!viewSeats);
    } else {
      setSelectedBus(bus)
        ;
      setViewSeats(true);
    }
  };
  const toggleSeatSelection = (seatNumber: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookedSeats[selectedBus?.id || '']?.includes(seatNumber) || (genderSeats.femaleSeats.includes(seatNumber) && !genderSeats.availableSeats.includes(seatNumber))) {
      setToast({ message: 'This seat is already booked or unavailable.', type: 'error' });
      return;
    }
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatNumber)
        ? prevSelectedSeats.filter((seat => seat !== seatNumber))
        : [...prevSelectedSeats, seatNumber]
    );
  };

  const totalPrice = selectedSeats.length * (selectedBus?.expense || 0);
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

  useEffect(() => {
    if (genderListData) {
      setGenderSeats({
        femaleSeats: genderListData.data.femaleSeatList,
        maleSeats: genderListData.data.maleSeatList,
        availableSeats: genderListData.data.availableSeatList,
      });
    }
  }, [genderListData]);


  useEffect(() => { }, [checkedState, busTypeState, expenseState, ratingsState]);

  return (
    <div>
      <div className="container">
        <div className="d-flex align-items-start mt-5" style={{ marginLeft: '-100px' }}>
          <h5 className="mb-0 mt-5">
            <span className="text-dark">{from}</span>
            <span style={{ color: colors.secondary }}>&rarr; </span>
            <span className="text-dark">{to}</span>
            <span style={{ color: colors.secondary }}>on </span>
            <span className="text-dark">&lt; {formattedDate.toLocaleDateString()} &gt;</span>
          </h5>
          <Button
            className="btn mt-5 ms-3 text-white border-0 p-2"
            style={{ backgroundColor: colors.pagecolor, height: '40px', borderRadius: '5px', width: '70px' }}
            onClick={() => navigate('/home')}
          >
            Modify
          </Button>
        </div>

        <div className="d-flex mt-4">
          <div className="col-lg-3 w-25">
            <Filters
              checkedState={checkedState}
              setCheckedState={setCheckedState}
              busTypeState={busTypeState}
              setBusTypeState={setBusTypeState}
              expenseState={expenseState}
              setExpenseState={setExpenseState}
              ratingsState={ratingsState}
              setRatingsState={setRatingsState}
            />
          </div>
          <div className="col-md-8 col-lg-9">
            <div className="row mt-3">
              {availableBuses.map((bus: any) => (
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
                  genderSeats={genderSeats}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableBuses;
