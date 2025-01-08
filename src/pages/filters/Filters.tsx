import React, { useState } from 'react';
import Checkbox from '../../components/CheckBox';
import PickUpPoints from './PickUpPoints';
import DroppingPoints from '../filters/DroppingPoints';

const Filters: React.FC = () => {
  const [checkedState, setCheckedState] = useState({ before6AM: false, sixTo12PM: false, twelveTo6PM: false, after6PM: false });
  const [busTypeState, setBusTypeState] = useState({ seater: false, sleeper: false, ac: false, nonAc: false });
  const [arrivalState, setArrivalState] = useState({ before6AM: false, sixTo12PM: false, twelveTo6PM: false, after6PM: false });
  const [searchTerm, setSearchTerm] = useState('');
  const [showPickUpPoints, setShowPickUpPoints] = useState(false);
  const [showDropOffPoints, setShowDropOffPoints] = useState(false);

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

  return (
    <div className="" style={{ marginLeft: '25px', marginTop:'100px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h6 className="fw-bold">Departure Time</h6>
        {checkboxes.map(({ label, checked }) => (
          <div key={label} style={{ marginBottom: '10px' }}>
            <Checkbox
              label={label}
              checked={checked}
              type="checkbox"
              onChange={() => handleCheckboxChange(label)}
            />
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h6 className="fw-bold">Bus Type</h6>
        {busTypes.map(({ label, checked }) => (
          <div key={label} style={{ marginBottom: '10px' }}>
            <Checkbox
              label={label}
              checked={checked}
              type="checkbox"
              onChange={() => handleBusTypeChange(label)}
            />
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h6 className="fw-bold">Arrival Time</h6>
        {arrivalTimes.map(({ label, checked }) => (
          <div key={label} style={{ marginBottom: '10px' }}>
            <Checkbox
              label={label}
              checked={checked}
              type="checkbox"
              onChange={() => handleArrivalChange(label)}
            />
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h6 className="fw-bold">Pickup Point</h6>
        <div className="search-wrapper">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search pickup Point"
            className="search-input"
            onClick={() => setShowPickUpPoints(true)} 
          />
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h6 className="fw-bold">Dropping Point</h6>
        <div className="search-wrapper">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="search dropping point"
            onClick={() => setShowDropOffPoints(true)}
          />
        </div>
      </div>

      {showPickUpPoints && (
        <PickUpPoints />
      )}

      {showDropOffPoints && (
        <DroppingPoints  />
      )}
    </div>
  );
};

export default Filters;
