import React from 'react';
import { CheckboxProps } from '../utils/entity/CommonEntity';

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, type, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
    };
    return (
        <div>
            <label>
                <input
                    type={type}
                    checked={checked}
                    onChange={handleChange}
                    className="form-check-input"
                    style={{
                        backgroundColor: checked ? '#732988' : '',
                    }}
                />
                {label}
            </label>
        </div>
    );
};

export default Checkbox;
