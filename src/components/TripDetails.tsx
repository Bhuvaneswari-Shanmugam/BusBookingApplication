import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { TripDetailsModalProps } from '../utils/entity/PageEntity';


const TripDetailsModal: React.FC<TripDetailsModalProps> = ({ show, onClose, onProceed }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Boarding & Dropping</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    <strong>From</strong>  
                    <span className="d-inline ml-4 justify-content-end">date</span>
                    <p className='text-secondary'>PickupPoint</p>

                    <strong>to</strong>
                    <p className="text-secondary">DroppingPoint</p>
                </p>
                <hr></hr>
                <p>
                    <strong><span className="d-inline ">Seat No:</span></strong>
                    <span className="d-inline ml-4 justify-content-end">L13, L18, L17, L14, L11, L10W</span>
                </p>

                <hr></hr>
                <strong><span className="d-inline ">Fare Details</span></strong>
                <p>
                    <span className="d-inline">Amount</span>
                    <span className="d-inline justify-content-end">INR  2000.00</span>
                </p>
                <div className="d-flex justify-content-center">
                      <Button variant="primary" onClick={onProceed}>
                       Proceed to Book
                       </Button>
                </div>
        
            </Modal.Body>
         </Modal>
    );
};

export default TripDetailsModal;
