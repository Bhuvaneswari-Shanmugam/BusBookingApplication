import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Checkbox from '../../components/CheckBox';
import Input from '../../components/Input';
import { colors } from '../../constants/Palette';
import PickUpPoints from './PickUpPoints';
import DroppingPoints from '../filters/DroppingPoints';
import TripDetailsModal from '../../components/TripDetails';
import 'bootstrap/dist/css/bootstrap.min.css';

const Filters = ({
  checkedState,
  setCheckedState,
  busTypeState,
  setBusTypeState,
  expenseState,
  setExpenseState,
  ratingsState,
  setRatingsState,
  buses,
}: any) => {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const { from, to, date } = location.state as { from: string; to: string; date: string } || {};
  const [showPickUpPoints, setShowPickUpPoints] = useState(false);
  const [showDropOffPoints, setShowDropOffPoints] = useState(false);
  const [selectedPickupPoints, setSelectedPickupPoints] = useState<Set<string>>(new Set());
  const [selectedDroppingPoints, setSelectedDroppingPoints] = useState<Set<string>>(new Set());

  const handleCheckboxChange = (label: string, state: any, setState: any) => {
    setState({
      ...state,
      [label]: !state[label],
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const renderSelectedPoints = (points: Set<string>) => {
    return Array.from(points).join(', ');
  };

  const handlePickupPointSelect = (selected: Set<string>) => {
    setSelectedPickupPoints(selected);
    setShowPickUpPoints(false);
    sessionStorage.setItem('selectedPickupPoints', JSON.stringify(Array.from(selected)));
    console.log('Selected Pickup Points:', Array.from(selected).join(', '));
  };

  const handleDropOffPointSelect = (selected: Set<string>) => {
    setSelectedDroppingPoints(selected);
    setShowDropOffPoints(false);
    sessionStorage.setItem('selectedDroppingPoints', JSON.stringify(Array.from(selected)));
    console.log('Selected Dropping Points:', Array.from(selected).join(', '));
  };



  return (
    <div className="container">
      <div>
        <h6 className="fw-bold">Departure Time</h6>
        {['Before 6 AM', '6AM-12 PM', '12PM-6PM', 'After 6PM'].map((label) => (
          <div key={label} className="form-check mb-2">
            <Checkbox
              label={label}
              checked={checkedState[label.toLowerCase().replace(' ', '')]}
              type="checkbox"
              onChange={() => handleCheckboxChange(label, checkedState, setCheckedState)}
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h6 className="fw-bold">Bus Type</h6>
        {['Seater', 'Sleeper', 'AC', 'Non-AC'].map((label) => (
          <div key={label} className="form-check mb-2">
            <Checkbox
              label={label}
              checked={busTypeState[label.toLowerCase()]}
              type="checkbox"
              onChange={() => handleBusTypeChange(label)}
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h6 className="fw-bold">Expense Range</h6>
        {['Below ₹500', '₹500 - ₹1000', 'Above ₹1000'].map((label) => (
          <div key={label} className="form-check mb-2">
            <Checkbox
              label={label}
              checked={expenseState[label.toLowerCase().replace(' ', '')]}
              type="checkbox"
              onChange={() => handleCheckboxChange(label, expenseState, setExpenseState)}
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h6 className="fw-bold">Ratings</h6>
        {['below4', '4.0 and above', '4.5 and above', '5.0 (Perfect)'].map((label) => (
          <div key={label} className="form-check mb-2">
            <Checkbox
              label={label}
              checked={ratingsState[label.replace(' ', '').toLowerCase()]}
              type="checkbox"
              onChange={() => handleCheckboxChange(label, ratingsState, setRatingsState)}
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
        bus={buses && buses.length > 0 ? buses[0] : {}}
        selectedPickupPoints={selectedPickupPoints}
        selectedDroppingPoints={selectedDroppingPoints}
        onProceed={() => {}}
        date={date}
      />
    </div>
  );
};

export default Filters;
