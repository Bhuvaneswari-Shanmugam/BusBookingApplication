import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faCreditCard, faUser } from '@fortawesome/free-solid-svg-icons';
import Profile from '../pages/profile';
import PaymentHistory from './PaymentCard';
import TripHistory from './TripCard';


const Sidebar: React.FC = () => {
    const [activeItem, setActiveItem] = useState('profile');
   const handleItemClick = (item: string) => {
        setActiveItem(item);
    };

    return (
        <div className=" bg-light d-flex">
            <div className="bg-light border-end vh-100 position-fixed top-0 start-0 overflow-auto mt-5" style={{ width: '250px' }}>
                <div
                    className={`nav-item mt-5 p-4 hover-blue ${activeItem === 'trips' ? 'active' : ''}`}
                    onClick={() => handleItemClick('trips')}
                >
                    <a className="nav-link text-dark" href="#">
                        <FontAwesomeIcon icon={faBus} className="mx-2" /> My Trips
                        <hr className="my-2" />
                    </a>
                </div>
                <div
                    className={`nav-item p-3 hover-blue ${activeItem === 'payment' ? 'active' : ''}`}
                    onClick={() => handleItemClick('payment')}
                >
                    <a className="nav-link text-dark justify-content-center" href="#">
                        <FontAwesomeIcon icon={faCreditCard} className='mx-2' /> Payment
                        <hr className="my-2" />
                    </a>
                </div>
                <div
                    className={`p-3 hover-blue nav-item ${activeItem === 'profile' ? 'active' : ''}`}
                    onClick={() => handleItemClick('profile')}
                >
                    <a className="nav-link text-dark" href="#">
                        <FontAwesomeIcon icon={faUser} className="mx-2" /> My Profile
                        <hr className="my-2" />
                    </a>
                </div>
                <style>{`
                    .hover-blue:hover {
                        background-color: #d866e2 !important;
                    }
                    .active {
                        background-color: #d866e2 !important;
                    }
                    .nav-item:hover ~ .nav-item.active {
                        background-color: inherit !important;
                    }
                `}</style>
            </div>

            <div className="content-container" style={{ marginLeft: '250px', padding: '20px' }}>
                {activeItem === `profile` && <Profile />}
                {activeItem === 'payment' && <PaymentHistory />}
                {activeItem === 'trips' && <TripHistory />} 
                
            </div>
        </div>
    );
};

export default Sidebar;
