import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { sidebarList } from '../../constants/adminConstants';

const Sidebar: React.FC = () => {
    return (
        <div
            className="bg-light border-end mt-5"
            style={{
                height: '100vh',
                width: '250px',
                color: 'black',
                paddingTop: '10px',
                marginTop: '0px',
            }}
        >
            <ul className="list-group list-group-flush mt-5 bg-light">
                {sidebarList.map((item, index) => (
                    <li key={index} className="list-group-item border-0 bg-light">
                        <Link
                            to={item.path}
                            className="sidebar-link d-flex align-items-center px-3 py-2 text-dark text-decoration-none rounded bg-light"
                            style={{ width: '100%' }}
                        >
                            <span className="ms-2 bg-light" style={{ marginRight: '10px' }}>
                                {item.icon}
                            </span>
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
