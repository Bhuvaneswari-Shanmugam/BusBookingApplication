// Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar: React.FC = () => {
  return (
    <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link" to="/show-my-ticket">
              Show My Ticket
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cancel-ticket">
              Cancel Ticket
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/my-profile">
              My Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/my-trips">
              My Trips
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/payment-history">
              Payment History
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
