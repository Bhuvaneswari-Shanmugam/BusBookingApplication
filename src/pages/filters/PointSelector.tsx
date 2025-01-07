import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

interface PointsSelectorProps {
  title: string;
  points: { id: number, name: string }[];
  onClose: () => void;
}

const PointsSelector: React.FC<PointsSelectorProps> = ({ title, points, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPoints, setSelectedPoints] = useState<Set<number>>(new Set());

  const filteredData = points.filter(point =>
    point.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (id: number) => {
    setSelectedPoints(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const handleApply = () => {
    console.log('Selected Points:', Array.from(selectedPoints));
    onClose();
  };

  const handleCancel = () => {
    setSelectedPoints(new Set());
    onClose();
  };

  return (
    <Modal show onHide={onClose} centered size="lg">
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
              key={point.id}
              style={{
                padding: '5px 10px',
                textAlign: 'center',
                flex: '1 1 22%',
              }}
            >
              <input
                type="checkbox"
                checked={selectedPoints.has(point.id)}
                onChange={() => handleCheckboxChange(point.id)}
              />
              <label>{point.name}</label>
            </div>
          ))
        ) : (
          <div>No results found</div>
        )}
      </div>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
        <Button variant="primary" onClick={handleApply}>Apply</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PointsSelector;