import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faCreditCard, faUser } from '@fortawesome/free-solid-svg-icons';
import Profile from '../pages/auth/Profile';
import PaymentHistory from '../pages/PaymentHistory';
import TripHistory from '../pages/TripHistory';
import Button from '../components/Button';
import { colors } from '../constants/Palette';

interface ProfileSidebarProps {
    userId: string;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ userId }) => {
    const [activeItem, setActiveItem] = useState<string>('profile');

    return (
        <div className="d-flex">
            <div
                className="bg-light vh-100 position-fixed top-20 start-0 overflow-auto d-flex flex-column align-items-center pt-5"
                style={{ width: '250px' }}
            >
                <div className="w-100">
                    <div className="text-center p-3">
                        <Button
                            className="w-100 text-start border-0 bg-transparent"
                            style={{ color: activeItem === 'trips' ? colors.darkorchid : 'black' }}
                            onClick={() => setActiveItem('trips')}
                        >
                            <FontAwesomeIcon icon={faBus} className="mx-2" /> My Trips
                        </Button>
                    </div>
                    <div className="text-center p-3">
                        <Button
                            className="w-100 text-start border-0 bg-transparent"
                            style={{ color: activeItem === 'payment' ? colors.darkorchid : 'black' }}
                            onClick={() => setActiveItem('payment')}
                        >
                            <FontAwesomeIcon icon={faCreditCard} className="mx-2" /> Payment
                        </Button>
                    </div>
                    <div className="text-center p-3">
                        <Button
                            className="w-100 text-start border-0 bg-transparent"
                            style={{ color: activeItem === 'profile' ? colors.darkorchid : 'black' }}
                            onClick={() => setActiveItem('profile')}
                        >
                            <FontAwesomeIcon icon={faUser} className="mx-2" /> My Profile
                        </Button>
                    </div>
                </div>
            </div>

            <div className="content-container d-flex justify-content-center align-items-center vh-100"
                style={{ marginLeft: '250px', padding: '20px' }}>
                {activeItem === 'profile' && <Profile />}
                {activeItem === 'payment' && <PaymentHistory />}
                {activeItem === 'trips' && <TripHistory />}
            </div>
        </div>
    );
};

export default ProfileSidebar;
