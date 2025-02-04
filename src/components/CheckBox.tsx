import React from 'react';
import { CheckboxProps } from '../utils/entity/CommonEntity';
import { colors } from '../constants/Palette';
import { space } from '../constants/Palette';


const Checkbox: React.FC<CheckboxProps> = ({ label, checked, type, onChange }) => {
    return (
        <div>
            <label style={{ display: 'flex', alignItems: 'center' ,gap:space.extraLarge}}>
                <input
                    type={type}
                    checked={checked}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.checked)}
                    className="form-check-input"
                    style={{
                     backgroundColor: checked ? colors.pagecolor : 'white',
                    borderColor:colors.pagecolor
                        
                    }}
                />
                {label}
            </label>
        </div>
    );
};

export default Checkbox;
