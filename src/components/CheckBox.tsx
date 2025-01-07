import React from 'react';
import { CheckboxProps } from '../utils/entity/CommonEntity';
import { colors } from '../constants/Palette';
import {space} from '../constants/Palette';

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, type, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
    };

    return (
        <div>
            <label style={{ display: 'flex', alignItems: 'center' }}> 
                <input
                    type={type}
                    checked={checked}
                    onChange={handleChange}
                    className="form-check-input"
                    style={{
                        backgroundColor: checked ? colors.backgroundColor : '',
                        marginRight:space.doubleExtraLarge, 
                    }}
                />
                {label}
            </label>
        </div>
    );
};

export default Checkbox;
