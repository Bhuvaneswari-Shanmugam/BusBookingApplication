import React from 'react';
import Select, { ActionMeta, SingleValue } from 'react-select';
import { DropdownProps } from '../utils/entity/CommonEntity';

const DropDown: React.FC<DropdownProps> = ({ options, onChange, text, className, style }) => {
  const customStyles = {
    placeholder: (provided: any) => ({
      ...provided,
      color: 'black', 
    }),

    
    
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#B966E2' : 'white',
      color: state.isFocused ? 'white' : '#333',
      padding: style?.option?.padding || '0',
      fontSize: style?.option?.fontSize || '16px',
    }),
  };

  const handleChange = (newValue: SingleValue<{ value: string; label: string }>, actionMeta: ActionMeta<{ value: string; label: string }>) => {
    if (newValue) {
      onChange(newValue.value);
    }
  };

  const dropdownOptions = options.map((option) => ({
    value: option,
    label: option,
  }));

  return (
    <div className={`drop-down ${className ? className : ''}`}>
      <Select
        placeholder={text}
        options={dropdownOptions}
        onChange={handleChange}
        styles={customStyles}
      />
    </div>
  );
};

export default DropDown;
