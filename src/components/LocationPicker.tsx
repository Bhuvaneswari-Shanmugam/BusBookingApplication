import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import {PointsSelectorProps} from '../utils/entity/PageEntity';



const LocationPicker: React.FC<PointsSelectorProps> = ({
  title,
  points,
  selectedPoints,
  onSelectionChange,
  onApply,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(true);

  const filteredData = points.filter((point) =>
    point.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (location: string) => {
    const newSelected = new Set(selectedPoints);
    if (newSelected.has(location)) {
      newSelected.delete(location);
    } else {
      newSelected.add(location);
    }
    onSelectionChange(newSelected);
  };

  const handleApply = () => {
    onApply(selectedPoints);
    setShowModal(false);
  };

  const handleCancel = () => {
    onSelectionChange(new Set());
    setShowModal(false);
  };

  return (
    <Modal show={showModal} onHide={handleCancel} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <input
        type="text"
        className="form-control mt-3 w-50"
        placeholder="Search place"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="mt-3 d-flex flex-wrap justify-content-evenly">
        {filteredData.length > 0 ? (
          filteredData.map((point) => (
            <div
              key={point.location}
              style={{
                padding: '5px 10px',
                textAlign: 'center',
                flex: '1 1 22%',
              }}
            >
              <input
                type="checkbox"
                checked={selectedPoints.has(point.location)}
                onChange={() => handleCheckboxChange(point.location)}
              />
              <label>{point.location}</label>
            </div>
          ))
        ) : (
          <div>No results found</div>
        )}
      </div>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleApply}>
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LocationPicker;
