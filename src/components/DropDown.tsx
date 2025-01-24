import React from 'react';
import { DropdownProps } from '../utils/entity/CommonEntity';

const DropDown: React.FC<DropdownProps> = ({ options, onChange, text,className }) => {
  return (
    <div className={`dropdown-container ${className ? className : ''}`}>
      <select onChange={(e) => onChange(e.target.value)} defaultValue="">
        <option value="" disabled>{text}</option>
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
