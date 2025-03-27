import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../layout/Header';
import ProfileSidebar from '../../components/ProfileSidebar';
import { DecodedToken } from '../../utils/entity/PageEntity';
import { jwtDecode } from 'jwt-decode';

const ProfileLayout: React.FC = () => {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode<DecodedToken>(token);
            setUserId(decodedToken.userId || null);
        }
    }, []);

    return (
        <div className="container mt-5 100-vh" >
            <Header />
            <div className="row">
                <div className="col-md-3">
                    <ProfileSidebar userId={userId || ''} />
                </div>
                <div className="col-md-9">
                
                    <Outlet />
                </div>
            </div>
        </div>
    ); 
};

export default ProfileLayout;
