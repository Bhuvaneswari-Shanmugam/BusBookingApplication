import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faCancel, faCreditCard, faHome, faList, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { colors } from '../constants/Palette';
interface ProfileSidebarProps {
userId: string;
}
const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ userId }) => {
const [activeItem, setActiveItem] = useState<string>('profile');
const navigate = useNavigate();
useEffect(() => {
if (activeItem === 'home') {
navigate('/home');
} else if (activeItem === 'signout') {
navigate('/');
} else if (activeItem === 'profile') {
navigate('/profile-layout');
} else if (activeItem === 'trips') {
navigate('/trip-history');
} else if (activeItem === 'cancel-ticket') {
navigate('/cancel-ticket');
} else if (activeItem === 'show-ticket') {
navigate('/show-ticket');
} else if (activeItem === 'payment-history') {
navigate('/payment-history');
}
}, [activeItem, navigate]);
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
style={{ color: activeItem === 'home' ? colors.darkorchid : 'black' }}
onClick={() => setActiveItem('home')}
>
<FontAwesomeIcon icon={faHome} className="mx-2" /> Home
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
style={{ color: activeItem === 'cancel-ticket' ? colors.darkorchid : 'black' }}
onClick={() => setActiveItem('cancel-ticket')}
>
<FontAwesomeIcon icon={faCancel} className="mx-2" /> Cancel Ticket
</Button>
</div>
<div className="text-center p-3">
<Button
className="w-100 text-start border-0 bg-transparent"
style={{ color: activeItem === 'show-ticket' ? colors.darkorchid : 'black' }}
onClick={() => setActiveItem('show-ticket')}
>
<FontAwesomeIcon icon={faList} className="mx-2" /> Show My Ticket
</Button>
</div>
<div className="text-center p-3">
<Button
className="w-100 text-start border-0 bg-transparent"
style={{ color: activeItem === 'payment-history' ? colors.darkorchid : 'black' }}
onClick={() => setActiveItem('payment-history')}
>
<FontAwesomeIcon icon={faCreditCard} className="mx-2" /> Payment History
</Button>
</div>
<div className="text-center p-3">
<Button
className="w-100 text-start border-0 bg-transparent"
style={{ color: activeItem === 'signout' ? colors.darkorchid : 'black' }}
onClick={() => setActiveItem('signout')}
>
<FontAwesomeIcon icon={faSignOut} className="mx-2" /> Sign out
</Button>
</div>
</div>
</div>
</div>
);
};
export default ProfileSidebar;