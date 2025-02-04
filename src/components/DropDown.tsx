import React from 'react';
import { DropdownProps } from '../utils/entity/CommonEntity';

const DropDown: React.FC<DropdownProps> = ({ options, onChange, text, className, style }) => {
  return (
    <div className={`drop-down ${className ? className : ''}`} style={{ ...style?.option }}>
      <select 
        onChange={(e) => onChange(e.target.value)} 
        defaultValue="" 
        style={{ ...style?.select }}
      >
        <option value="" disabled>{text}</option>
        {options.map((option, index) => (
          <option key={index} value={option}
          style={{ ...style?.option }}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
