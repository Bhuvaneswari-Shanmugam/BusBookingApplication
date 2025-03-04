import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Button from '../Button';
import profile from '../../assets/profile.jpg';
import logo from '../../assets/logo.jpg';
import { DecodedToken } from '../../utils/entity/PageEntity';
import { useGetUserByIdQuery } from '../../redux/services/UserApi';
import { colors } from '../../constants/Palette';
import ProfileLayout from './ProfileLayout';

interface HeaderProps {
  aboutCardRef?: React.RefObject<HTMLDivElement | null>;
  contactCardRef?: React.RefObject<HTMLDivElement | null>;
  serviceCardRef?: React.RefObject<HTMLDivElement | null>;
}

const Header: React.FC<HeaderProps> = ({ aboutCardRef, contactCardRef, serviceCardRef }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [firstName, setFirstName] = useState('User');
  const [userId, setUserId] = useState<string | null>(null);
  const [profileClicked, setProfileClicked] = useState(false);

  const handleClick = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('Token');
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        console.log("token fom header : " ,token);
        console.log('first name: ', decodedToken.firstName);
        setFirstName(decodedToken.firstName || 'User');
        console.log("from header userId : ",decodedToken.userId);
        setUserId(decodedToken.userId || null);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);
   
  const handleSignOut = () => {
    sessionStorage.removeItem('Token');
    sessionStorage.removeItem('RefreshToken');
    sessionStorage.removeItem('FirstName');
    sessionStorage.removeItem('userId');
    navigate('/');
  };

  const handleProfileClick = () => {
    setProfileClicked(true);
    navigate(`/profile-layout`);
  };
  

  const isBusesPage = location.pathname === '/buses';
  const isProfilePage = location.pathname.startsWith('/profile/');
  const isProfileLayout= location.pathname.startsWith('/profile-layout')
  

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid me-5">
        <img
          src={logo}
          alt="Logo"
          width="80"
          height="60"
          className="d-inline-block align-text-top ms-3"
        />
        {!isProfilePage && !isBusesPage && !isProfileLayout && (
          <>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="mx-3">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Button className="nav-link mx-3 btn" style={{ background: 'none' }} onClick={() => aboutCardRef && handleClick(aboutCardRef)}>About</Button>
                </li>
                <li className="nav-item">
                  <Button className="nav-link mx-3 btn" style={{ background: 'none' }} onClick={() => serviceCardRef && handleClick(serviceCardRef)}>Services</Button>
                </li>
                <li className="nav-item">
                  <Button className="nav-link mx-3 btn" style={{ background: 'none' }} onClick={() => contactCardRef && handleClick(contactCardRef)}>Contact</Button>
                </li>
              </ul>
            </div>
          </>
        )}

        <div className="d-flex ms-auto">
          <span className="dropdown-item-end py-0 px-0">{firstName}</span>
          <div className="dropdown">
            <Button
              className="btn btn-link dropdown-toggle p-0"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{background:'none',color:colors.pagecolor}}
            >
              <img
                src={profile}
                alt="User Profile"
                width="30"
                height="30"
                className="rounded-circle"
               
              />
            </Button>
            <ul className="dropdown-menu dropdown-menu-end"  style={{}} aria-labelledby="dropdownMenuButton">
              <li>
                <Button className="dropdown-item" onClick={handleProfileClick}>My Account</Button>
              </li>
              <li>
                <Button className="dropdown-item" onClick={handleSignOut}>Signout</Button>
              </li>
            </ul>
          </div>
          <style>{`
        .dropdown-item:hover {
          background-color: #9932CC !important;
        }
      `}</style>
        </div>
      </div>
    </nav>
  );
};

export default Header;
