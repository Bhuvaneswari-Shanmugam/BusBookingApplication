import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetBusesForTripQuery } from '../../redux/services/TripApi';
import PickUpPoints from './PickUpPoints';
import DroppingPoints from '../filters/DroppingPoints';
import Checkbox from '../../components/CheckBox';
import 'bootstrap/dist/css/bootstrap.min.css';

const Filters: React.FC = () => {
  const location = useLocation();
  const { from, to, date } = location.state || {};

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
  const [arrivalState, setArrivalState] = useState({
    before6AM: false,
    sixTo12PM: false,
    twelveTo6PM: false,
    after6PM: false,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showPickUpPoints, setShowPickUpPoints] = useState(false);
  const [showDropOffPoints, setShowDropOffPoints] = useState(false);
  const [selectedBus, setSelectedBus] = useState<null | any>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [selectedPickupPoints, setSelectedPickupPoints] = useState<Set<string>>(new Set());
  const [selectedDroppingPoints, setSelectedDroppingPoints] = useState<Set<string>>(new Set());

  const checkboxes = [
    { label: 'Before 6 AM', checked: checkedState.before6AM },
    { label: '6AM-12 PM', checked: checkedState.sixTo12PM },
    { label: '12PM-6PM', checked: checkedState.twelveTo6PM },
    { label: 'After 6PM', checked: checkedState.after6PM },
  ];

  const busTypes = [
    { label: 'Seater', checked: busTypeState.seater },
    { label: 'Sleeper', checked: busTypeState.sleeper },
    { label: 'AC', checked: busTypeState.ac },
    { label: 'Non-AC', checked: busTypeState.nonAc },
  ];

  const arrivalTimes = [
    { label: 'Before 6 AM', checked: arrivalState.before6AM },
    { label: '6AM-12 PM', checked: arrivalState.sixTo12PM },
    { label: '12PM-6PM', checked: arrivalState.twelveTo6PM },
    { label: 'After 6PM', checked: arrivalState.after6PM },
  ];

  const { data: buses, isLoading, isError } = useGetBusesForTripQuery({
    pickupPoint: from,
    destinationPoint: to,
    pickupTime: date,
    busType: busTypeState.seater ? 'Seater' : busTypeState.sleeper ? 'Sleeper' : busTypeState.ac ? 'AC' : busTypeState.nonAc ? 'Non-AC' : undefined,
    timeSlot: checkedState.before6AM ? 'Before 6 AM' : checkedState.sixTo12PM ? '6AM-12 PM' : checkedState.twelveTo6PM ? '12PM-6PM' : checkedState.after6PM ? 'After 6PM' : undefined,
  });

  useEffect(() => {}, [searchTerm, busTypeState, checkedState]);

  const handleCheckboxChange = (label: string) => {
    setCheckedState({
      before6AM: label === 'Before 6 AM',
      sixTo12PM: label === '6AM-12 PM',
      twelveTo6PM: label === '12PM-6PM',
      after6PM: label === 'After 6PM',
    });
  };

  const handleBusTypeChange = (label: string) => {
    setBusTypeState({
      seater: label === 'Seater',
      sleeper: label === 'Sleeper',
      ac: label === 'AC',
      nonAc: label === 'Non-AC',
    });
  };

  const handleArrivalChange = (label: string) => {
    setArrivalState({
      before6AM: label === 'Before 6 AM',
      sixTo12PM: label === '6AM-12 PM',
      twelveTo6PM: label === '12PM-6PM',
      after6PM: label === 'After 6PM',
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleSeatSelection = (seatNumber: number, e: React.MouseEvent) => {
    const updatedSeats = selectedSeats.includes(seatNumber)
      ? selectedSeats.filter((seat) => seat !== seatNumber)
      : [...selectedSeats, seatNumber];
    setSelectedSeats(updatedSeats);
  };

  const totalPrice = selectedSeats.length * 100;

  const handlePickupPointSelect = (selected: Set<string>) => {
    setSelectedPickupPoints(selected);
    setShowPickUpPoints(false);
  };
  const handleDropOffPointSelect = (selected: Set<string>) => {
    setSelectedDroppingPoints(selected);
    setShowDropOffPoints(false);
  };

  const renderSelectedPoints = (points: Set<string>) => {
    return Array.from(points).join(', ');
  };

  return (
    <div className="container mt-5">
      <div className="mb-4" style={{ marginRight: '40px', marginTop: '100px' }}>
        <h6 className="fw-bold">Departure Time</h6>
        {checkboxes.map(({ label, checked }) => (
          <div key={label} className="form-check mb-2">
            <Checkbox
              label={label}
              checked={checked}
              type="checkbox"
              onChange={() => handleCheckboxChange(label)}
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h6 className="fw-bold">Bus Type</h6>
        {busTypes.map(({ label, checked }) => (
          <div key={label} className="form-check mb-2">
            <Checkbox
              label={label}
              checked={checked}
              type="checkbox"
              onChange={() => handleBusTypeChange(label)}
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h6 className="fw-bold">Arrival Time</h6>
        {arrivalTimes.map(({ label, checked }) => (
          <div key={label} className="form-check mb-2">
            <Checkbox
              label={label}
              checked={checked}
              type="checkbox"
              onChange={() => handleArrivalChange(label)}
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h6 className="fw-bold">Pickup Point</h6>
        <div className="input-group">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search pickup Point"
            className="form-control"
            onClick={() => setShowPickUpPoints(true)}
          />
        </div>
        {selectedPickupPoints.size > 0 && (
          <div className="mt-2">
            <span className="text-primary">{renderSelectedPoints(selectedPickupPoints)}</span>
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className="input-group">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search dropping point"
            className="form-control"
            onClick={() => setShowDropOffPoints(true)}
          />
        </div>
        {selectedDroppingPoints.size > 0 && (
          <div className="mt-2">
            <strong>Dropping Points: </strong> 
            <span className="text-primary">{renderSelectedPoints(selectedDroppingPoints)}</span>
          </div>
        )}
      </div>

      {showPickUpPoints && (
        <PickUpPoints
          onSelectionChange={setSelectedPickupPoints}
          onApply={handlePickupPointSelect}
        />
      )}
      {showDropOffPoints && (
        <DroppingPoints
          onSelectionChange={setSelectedDroppingPoints}
          onApply={handleDropOffPointSelect}
        />
      )}
    </div>
  );
};

export default Filters;
