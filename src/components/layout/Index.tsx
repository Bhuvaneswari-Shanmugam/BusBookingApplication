import React from "react";
import { Outlet } from "react-router-dom";
import bg from '../../assets/images/bg.jpg';

const Layout: React.FC = () => {
  return (
    <div
      style={{ minHeight: "100vh", width: "100%", position: "relative", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", }} >

      <div
        style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", position: "absolute", top: 0, left: 0, right: 0, bottom: 0, filter: "blur(7px)", zIndex: -1, }} />

      <div className="card border-0 shadow-lg bg-light" style={{ width: "100%", maxWidth: "400px", padding: "1rem", zIndex: 1, }}>
        <div className="card-body d-flex flex-column justify-content-between">
          <Outlet />
        </div>
      </div>
    </div>

  );
};

export default Layout;
