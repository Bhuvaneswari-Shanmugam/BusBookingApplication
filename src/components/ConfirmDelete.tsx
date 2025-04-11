import React, { useState } from 'react';
import Button from '../../src/components/Button';
import { colors } from '../../src/constants/Palette';
import Card from '../../src/components/Card';


interface DeletionConfirmationPopupProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const DeletionConfirmation: React.FC<DeletionConfirmationPopupProps> = ({ onConfirm, onCancel }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDeleteConfirmation = () => {
        setIsOpen(true);
        onConfirm();
    }
    const handleCancelDeleteConfirmation = () => {

        onCancel();
        setIsOpen(false);
    }

    return (
        <Card
          className='w-25'
            description={

                <div className=" popup ">
                    <div className="popup-content">
                        <p>Are you sure you want to delete this item?</p>
                        <Button className="border-0 me-4" onClick={handleDeleteConfirmation} style={{ backgroundColor: colors.pagecolor }}>Yes</Button>
                        <Button className="border-0" onClick={handleCancelDeleteConfirmation} style={{ backgroundColor: colors.pagecolor }}> No </Button>
                        
                    </div>
                </div>

            }/>
        );
};

export default DeletionConfirmation;
