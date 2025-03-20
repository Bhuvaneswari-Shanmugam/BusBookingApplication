import React from 'react';
import Sidebar from "../admin/Sidebar";
import { Outlet } from 'react-router-dom';
import Header from '../../components/layout/Header';

const AdminLayout: React.FC = () => {
  return (
    <div  style={{ display: 'flex', height: '100vh' }}>
      <Header />
      <Sidebar  />
      <div style={{ flexGrow: 1, overflow: 'auto', padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;