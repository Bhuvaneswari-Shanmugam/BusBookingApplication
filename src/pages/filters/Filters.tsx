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
  busCategoryState,
  setBusCategoryState,
  expenseState,
  setExpenseState,
  ratingsState,
  setRatingsState,
  buses,
}: any) => {
  const [pickupSearchTerm, setPickupSearchTerm] = useState('');
  const [dropoffSearchTerm, setDropoffSearchTerm] = useState('');
  const location = useLocation();
  const { from, to, date } = location.state as { from: string; to: string; date: string } || {};
  const [showPickUpPoints, setShowPickUpPoints] = useState(false);
  const [showDropOffPoints, setShowDropOffPoints] = useState(false);
  const [selectedPickupPoints, setSelectedPickupPoints] = useState<Set<string>>(new Set());
  const [selectedDroppingPoints, setSelectedDroppingPoints] = useState<Set<string>>(new Set());

  const handleDepartureChange = (type: string, label: string) => {
    setCheckedState((prevState: any) => {
      const newState = { ...prevState };
      const key = label.toLowerCase().replace(' ', '');
      if (newState[key]) {
        delete newState[key];
      } else {
        newState[key] = label;
      }
      return newState;
    });
  };

  const handleArrivalChange = (type: string, label: string) => {
    setCheckedState((prevState: any) => {
      const newState = { ...prevState };
      const key = label.toLowerCase().replace(' ', '');
      if (newState[key]) {
        delete newState[key];
      } else {
        newState[key] = label;
      }
      return newState;
    });
  };

  const handleBusTypeChange = (label: string) => {
    setBusTypeState((prevState: any) => {
      const newState = { ...prevState };
      const key = label.toLowerCase();
      if (newState[key]) {
        delete newState[key];
      } else {
        newState[key] = label;
      }
      return newState;
    });
  };

  const handleBusCategoryChange = (label: string) => {
    setBusCategoryState((prevState: any) => {
      const newState = { ...prevState };
      const key = label.toLowerCase().replace(' ', '');
      if (newState[key]) {
        delete newState[key];
      } else {
        newState[key] = label;
      }
      return newState;
    });
  };

  const handleBusRatingChange = (label: string) => {
    setRatingsState((prevState: any) => {
      const newState = { ...prevState };
      const key = label.replace(' ', '').toLowerCase();
      if (newState[key]) {
        delete newState[key];
      } else {
        newState[key] = label;
      }
      return newState;
    });
  };

  const handleBusExpenseChange = (label: string) => {
    setExpenseState((prevState: any) => {
      const newState = { ...prevState };
      const key = label.toLowerCase().replace(' ', '');
      if (newState[key]) {
        delete newState[key];
      } else {
        newState[key] = label;
      }
      return newState;
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (type === 'pickup') {
      setPickupSearchTerm(event.target.value);
      setShowPickUpPoints(true);
    } else {
      setDropoffSearchTerm(event.target.value);
      setShowDropOffPoints(true);
    }
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
    <div className="container bg-light mt-4" style={{ marginLeft: '-240px' }}>
      <div className="ms-3">
        <h5 className="fw-bold mt-5">Departure Time</h5>
        {['Before 6 AM', '6AM-12 PM', '12PM-6PM', 'After 6PM'].map((label) => (
          <div key={label} className="form-check mb-2 ms-2">
            <Checkbox
              label={label}
              checked={checkedState[label.toLowerCase().replace(' ', '')]}
              type="checkbox"
              onChange={() => handleDepartureChange('departure', label)}
            />
          </div>
        ))}
      </div>

      <div className="ms-3">
        <h5 className="fw-bold mt-5">Arrival Time</h5>
        {['Before 6 AM', '6AM-12 PM', '12PM-6PM', 'After 6PM'].map((label) => (
          <div key={label} className="form-check mb-2 ms-2">
            <Checkbox
              label={label}
              checked={checkedState[label.toLowerCase().replace(' ', '')]}
              type="checkbox"
              onChange={() => handleArrivalChange('arrival', label)}
            />
          </div>
        ))}
      </div>

      <div className="mb-4 ms-3">
        <h5 className="fw-bold">Bus Type</h5>
        {['Seater', 'Sleeper'].map((label) => (
          <div key={label} className="form-check mb-2 ms-2">
            <Checkbox
              label={label}
              checked={busTypeState[label.toLowerCase()]}
              type="checkbox"
              onChange={() => handleBusTypeChange(label)}
            />
          </div>
        ))}
      </div>

      <div className="mb-4 ms-3">
        <h5 className="fw-bold">Bus Category</h5>
        {['AC', 'Non-Ac'].map((label) => (
          <div key={label} className="form-check mb-2 ms-2">
            <Checkbox
              label={label}
              checked={busCategoryState[label.toLowerCase().replace(' ', '')]}
              type="checkbox"
              onChange={() => handleBusCategoryChange(label)}
            />
          </div>
        ))}
      </div>

      <div className="mb-4 ms-3">
        <h5 className="fw-bold">Expense Range</h5>
        {['Below ₹500', '₹500 - ₹1000', 'Above ₹1000'].map((label) => (
          <div key={label} className="form-check mb-2 ms-2">
            <Checkbox
              label={label}
              checked={expenseState[label.toLowerCase().replace(' ', '')]}
              type="checkbox"
              onChange={() => handleBusExpenseChange(label)}
            />
          </div>
        ))}
      </div>

      <div className="mb-4 ms-3">
        <h5 className="fw-bold">Ratings</h5>
        {['Below 4', '4.0 and above', '4.5 and above', '5.0 (Perfect)'].map((label) => (
          <div key={label} className="form-check mb-2 ms-2">
            <Checkbox
              label={label}
              checked={ratingsState[label.replace(' ', '').toLowerCase()]}
              type="checkbox"
              onChange={() => handleBusRatingChange(label)}
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h6 className="fw-bold">Pickup Point</h6>
        <div className="input-group">
          <Input
            type="text"
            value={pickupSearchTerm}
            onChange={(e) => handleSearchChange(e, 'pickup')}
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
        <h6 className="fw-bold">Dropping Point</h6>
        <div className="input-group">
          <Input
            type="text"
            value={dropoffSearchTerm}
            onChange={(e) => handleSearchChange(e, 'dropoff')}
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
        <PickUpPoints onSelectionChange={setSelectedPickupPoints} onApply={handlePickupPointSelect} />
      )}

      {showDropOffPoints && (
        <DroppingPoints onSelectionChange={setSelectedDroppingPoints} onApply={handleDropOffPointSelect} />
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
