import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import profile from '../../assets/profile.jpg';
import logo from '../../assets/logo.jpg';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../../utils/entity/PageEntity';
import { useGetUserByIdQuery } from '../../redux/services/UserApi';  
import { Link } from 'react-router-dom';

interface HeaderProps {
  aboutCardRef: React.RefObject<HTMLDivElement | null>;
}

const Header: React.FC<HeaderProps> = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [firstName, setFirstName] = useState('User');
  const [userId, setUserId] = useState<string | null>(null);
  const [profileClicked, setProfileClicked] = useState(false);  
  const aboutCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('Token');
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        setFirstName(decodedToken.FirstName || 'User');
        setUserId(decodedToken.UserId || null);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const { data: userData, error, isLoading } = useGetUserByIdQuery(userId || '', {
    skip: !profileClicked,
  });

  const handleSignOut = () => {
    sessionStorage.removeItem('Token');
    sessionStorage.removeItem('RefreshToken');
    sessionStorage.removeItem('FirstName');
    sessionStorage.removeItem('userId');
    navigate('/');
  };

  const handleProfileClick = () => {
    setProfileClicked(true);  
    navigate(`/profile`);
  };

  // Check if we are on the "/buses" route
  const isBusesPage = location.pathname === '/buses';

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
       {!isBusesPage && (
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="mx-3">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link mx-3 btn">
                  About
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link mx-3 btn">
                  Contact
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link mx-3">
                  Services
                </button>
              </li>
            </ul>
          </div>
        )}

        <div className="d-flex ms-auto">
          <span className="dropdown-item-end py-0 px-0">{firstName}</span>
          <div className="dropdown">
            <button
              className="btn btn-link dropdown-toggle p-0"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={profile}
                alt="User Profile"
                width="30"
                height="30"
                className="rounded-circle"
              />
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
              <li>
                <button className="dropdown-item" onClick={handleProfileClick}>
                  Profile
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleSignOut}>Signout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
