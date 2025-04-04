import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';
import { jwtDecode } from 'jwt-decode';

interface CustomJwtPayload {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  phoneNumber: string;
  address: string;
  role: string;
}

const ProfileWrapper: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('Token');
    if (token) {
      try {
        const decodedToken = jwtDecode<CustomJwtPayload>(token);
        setUserId(decodedToken.userId);
      } catch (error) {
        console.error("Error decoding token:", error);
        navigate('/home'); 
      }
    } else {
      navigate('/home'); 
    }
  }, [navigate]);
  sessionStorage.setItem("userId",userId as string);
  console.log(userId + "useridsssss");
  
  if (!userId) {
    return <p>Loading...</p>;
  }

  return <Profile userId={userId} />;
};

export default ProfileWrapper;
