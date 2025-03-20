import React, { useState } from 'react';


interface DeletionConfirmationPopupProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const DeletionConfirmationPopup: React.FC<DeletionConfirmationPopupProps> = ({ onConfirm, onCancel }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDeleteClick = () => {
        setIsOpen(true);
    };

    const handleConfirmDelete = () => {
        onConfirm();
        setIsOpen(false);
    };

    const handleCancelDelete = () => {
        onCancel();
        setIsOpen(false);
    };

    return (
        <div>
            <button onClick={handleDeleteClick}>Delete Item</button>
            {isOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <p>Are you sure you want to delete this item?</p>
                        <button onClick={handleConfirmDelete}>Yes</button>
                        <button onClick={handleCancelDelete}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeletionConfirmationPopup;