import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetBusesForTripQuery } from '../../redux/services/TripApi';
import PickUpPoints from './PickUpPoints';
import DroppingPoints from '../filters/DroppingPoints';
import Checkbox from '../../components/CheckBox';
import Input from '../../components/Input';
import 'bootstrap/dist/css/bootstrap.min.css';
import { colors } from '../../constants/Palette';
import TripDetailsModal from '../../components/TripDetails';

const Filters: React.FC = () => {
  const location = useLocation();
  const { from, to, date } = location.state || {};
  const [searchTerm, setSearchTerm] = useState('');
  const [showPickUpPoints, setShowPickUpPoints] = useState(false);
  const [showDropOffPoints, setShowDropOffPoints] = useState(false);
  const [selectedPickupPoints, setSelectedPickupPoints] = useState<Set<string>>(new Set());
  const [selectedDroppingPoints, setSelectedDroppingPoints] = useState<Set<string>>(new Set());

  const [checkedState, setCheckedState] = useState({
    before6AM: false,
    sixTo12PM: false,
    twelveTo6PM: false,
    after6PM: false,
  });

  const [expenseState, setExpenseState] = useState({
    below500: false,
    between500and1000: false,
    above1000: false,
  });

  const [ratingsState, setRatingsState] = useState({
    below4:false,
    above4: false,
    above4_5: false,
    perfect5: false,
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

  const expenseRanges = [
    { label: 'Below ₹500', checked: expenseState.below500 },
    { label: '₹500 - ₹1000', checked: expenseState.between500and1000 },
    { label: 'Above ₹1000', checked: expenseState.above1000 },
  ];

  const ratingsRanges = [
    {label : 'below 4.0', checked:ratingsState.below4},
    { label: '4.0 and above', checked: ratingsState.above4 },
    { label: '4.5 and above', checked: ratingsState.above4_5 },
    { label: '5.0 (Perfect)', checked: ratingsState.perfect5 },
  ];

  const { data: buses, isLoading, isError } = useGetBusesForTripQuery({
    pickupPoint: from,
    destinationPoint: to,
    pickupTime: date,
    busType: busTypeState.seater ? 'Seater' : busTypeState.sleeper ? 'Sleeper' : busTypeState.ac ? 'AC' : busTypeState.nonAc ? 'Non-AC' : undefined,
    timeSlot: checkedState.before6AM ? 'Before 6 AM' : checkedState.sixTo12PM ? '6AM-12 PM' : checkedState.twelveTo6PM ? '12PM-6PM' : checkedState.after6PM ? 'After 6PM' : undefined,
    expenseRange: expenseState.below500 ? 'Below ₹500': expenseState.between500and1000? '₹500 - ₹1000': expenseState.above1000? 'Above ₹1000': undefined,
    ratingRange: ratingsState.below4 ? 'below4' : ratingsState.above4? '4.0 and above': ratingsState.above4_5? '4.5 and above': ratingsState.perfect5? '5.0 (Perfect)': undefined,
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

  const handleExpenseChange = (label: string) => {
    setExpenseState({
      below500: label === 'Below ₹500',
      between500and1000: label === '₹500 - ₹1000',
      above1000: label === 'Above ₹1000',
    });
  };

  const handleRatingsChange = (label: string) => {
    setRatingsState({
      below4: label === 'below 4.0',
      above4: label === '4.0 and above',
      above4_5: label === '4.5 and above',
      perfect5: label === '5.0 (Perfect)',
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  


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
    <div className="container bg-light  p-4 " style={{ marginLeft: '-100px' }}>
      <div className="">
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
        <h6 className="fw-bold">Expense Range</h6>
        {expenseRanges.map(({ label, checked }) => (
          <div key={label} className="form-check mb-2">
            <Checkbox
              label={label}
              checked={checked}
              type="checkbox"
              onChange={() => handleExpenseChange(label)}
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h6 className="fw-bold">Ratings</h6>
        {ratingsRanges.map(({ label, checked }) => (
          <div key={label} className="form-check mb-2">
            <Checkbox
              label={label}
              checked={checked}
              type="checkbox"
              onChange={() => handleRatingsChange(label)}
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h6 className="fw-bold">Pickup Point</h6>
        <div className="input-group">
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search pickup Point"
            className="form-control"
            onClick={() => setShowPickUpPoints(true)}
            style={{ borderColor: colors.pagecolor }}
          />
        </div>
        {selectedPickupPoints.size > 0 && (
          <div className="mt-2">
            <span style={{ color: colors.pagecolor }}>{renderSelectedPoints(selectedPickupPoints)}</span>
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className="input-group">
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search dropping point"
            className="form-control"
            onClick={() => setShowDropOffPoints(true)}
            style={{ borderColor: colors.pagecolor }}
          />
        </div>
        {selectedDroppingPoints.size > 0 && (
          <div className="mt-2">
            <span style={{ color: colors.pagecolor }}>{renderSelectedPoints(selectedDroppingPoints)}</span>
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

      <TripDetailsModal
        bus={buses ? buses[0] : {}}
        selectedPickupPoints={selectedPickupPoints}
        selectedDroppingPoints={selectedDroppingPoints}
        onProceed={() => {}}
      />
    </div>
  );
};

export default Filters;
