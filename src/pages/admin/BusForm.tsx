import React from 'react';
import Label from '../../components/Label';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { colors } from '../../constants/Palette';

type BusFormProps = {
  formData: any;
  isProcessing: boolean;
  isUpdatingMode: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  resetForm: () => void;
};

const BusForm: React.FC<BusFormProps> = ({
  formData,
  isProcessing,
  isUpdatingMode,
  handleInputChange,
  handleSubmit,
  resetForm
}) => {
  return (
    <div>
      <h2 className="mt-3 mb-4 text-center">{isUpdatingMode ? 'Update Bus' : 'Create New Bus'}</h2>
      <form onSubmit={handleSubmit}>
        {['number', 'tripNumber', 'type', 'capacity', 'name', 'departureTime', 'pickupPoint', 'duration', 'arrivalTime', 'droppingPoint', 'expense', 'ratings'].map((field, idx) => (
          <div key={idx} className="d-flex flex-column flex-sm-row mb-3">
            <Label htmlFor={field} className="form-label me-2 label-width">{field.replace(/([A-Z])/g, ' $1').toUpperCase()}</Label>
            <Input
              type={field === 'expense' || field === 'capacity' || field === 'ratings' ? 'number' : 'text'}
              className="form-control"
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
              required
              min={field === 'expense' || field === 'capacity' ? '0' : undefined}
              max={field === 'ratings' ? '5' : undefined}
              step={field === 'ratings' ? '0.1' : undefined}
            />
          </div>
        ))}
        <div className="d-flex justify-content-center flex-column flex-sm-row">
          <Button type="submit" className="btn me-4 border-0" style={{ backgroundColor: colors.pagecolor }} disabled={isProcessing}>
            {isProcessing ? 'Processing...' : isUpdatingMode ? 'Update' : 'Create'}
          </Button>
          <Button
            type="button"
            className="btn border-0" style={{ backgroundColor: colors.pagecolor }}
            onClick={() => {
              resetForm();
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BusForm;
