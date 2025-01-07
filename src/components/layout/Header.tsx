import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Button from '../../components/Button';

const Header: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid me-5">
        <img
          src="" 
          alt="Logo"
          width="80"
          height="60"
          className="d-inline-block align-text-top ms-3"
        />
        <Button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </Button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
           
            <li className="nav-item">
              <Link className="nav-link mx-3" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link mx-3" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link mx-3" to="/contact">Contact</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link mx-3" to="/services">Services</Link>
            </li>
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
                src="" 
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
                <Button className="dropdown-item">Signout</Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
