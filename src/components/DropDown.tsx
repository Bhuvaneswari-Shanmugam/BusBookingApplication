import React from 'react';
import { DropdownProps } from '../utils/entity/CommonEntity';

const DropDown: React.FC<DropdownProps> = ({ label, options, onChange }) => {
  return (
    <div className="dropdown-container">
      <label>{label}</label>
      <select onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled selected>
          Select the option
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
