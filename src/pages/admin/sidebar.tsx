import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { sidebarList } from '../../constants/adminConstants';
import { colors } from '../../constants/Palette';

const Sidebar: React.FC = () => {
    return (
        <div>
            <style>{`
                .hover-color:hover {
                    color: #9932CC !important;
                }

                .hover-color:hover span {
                    color: #9932CC !important;
                }
            `}</style>
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
                                className="sidebar-link  d-flex align-items-center px-3 py-2 text-dark text-decoration-none rounded bg-light hover-color"
                                style={{ width: '100%' }}
                            >
                                <span className="ms-3 me-3 bg-light" style={{backgroundColor:colors.pagecolor}}>
                                    {item.icon}
                                </span>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
