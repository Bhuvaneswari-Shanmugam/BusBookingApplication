import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { LayoutProps } from '../../utils/entity/CommonEntity';

const Layout: React.FC<LayoutProps> = ({ NavbarComponent, FooterComponent }) => {
  const location = useLocation();
  const showNavbar = ['/home'];
  const showFooter = location.pathname === '/home';

  return (
    <div>
      <header>
        {showNavbar.includes(location.pathname) && NavbarComponent && <NavbarComponent />}
      </header>

      <main>
        <Outlet />
      </main>
     
     {showFooter && FooterComponent && (
        <footer>
          <FooterComponent />
        </footer>
      )}
    </div>
  );
};

export default Layout;
