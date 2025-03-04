import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../layout/Header';
import ProfileSidebar from '../../components/ProfileSidebar';
import { DecodedToken } from '../../utils/entity/PageEntity';
import { jwtDecode } from 'jwt-decode';

const ProfileLayout: React.FC = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode<DecodedToken>(token);
                console.log("Token from ProfileLayout:", token);
                console.log("UserID from ProfileLayout:", decodedToken.userId);
                setUserId(decodedToken.userId || null);
                console.log("id : ", userId);
            } catch (error) {
                console.error("Error decoding token:", error);
                sessionStorage.removeItem('token');
                navigate('/home'); // Redirect to login if token is invalid
            }
        } else {
            navigate('/profile-layout'); // Redirect if no token is found
        }
    }, [navigate]);

    return (
        <div className="container mt-5">
            <Header />
            <div className="row">
                <div className="col-md-3">
                    <ProfileSidebar userId={userId ?? ""} /> 
                </div>
                <div className="col-md-9">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ProfileLayout;
