import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { navLinks } from '../../constants';
import profile from '../../assets/profile.jpg';
import logo from '../../assets/logo.jpg';

const Header: React.FC = () => {
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
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navLinks.map(({ name, to }, index) => (
              <li className="nav-item" key={index}>
                <Link className="nav-link mx-3" to={to} smooth>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
          <span className="dropdown-item-end py-2 px-2"></span>
          <div className="dropdown">
            <button
              className="btn btn-link dropdown-toggle p-0"
              type="button"
              id="dropdownMenuButton"
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
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <button className="dropdown-item">Signout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
