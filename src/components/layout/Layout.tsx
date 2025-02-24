import { useLocation, Outlet } from 'react-router-dom';
import { useRef } from 'react';
import Header from '../../components/layout/Header';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  const aboutCardRef = useRef<HTMLDivElement>(null);
  const isHomePage = location.pathname === '/home';
   return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {isHomePage && <Header aboutCardRef={aboutCardRef} />}
      <div style={{ display: 'flex', flexGrow: 1 }}>
        
        <main style={{ flexGrow: 1, overflow: 'auto', padding: '20px' }}>
          <Outlet />
        </main>
      </div>
      {isHomePage && <Footer />}
    </div>
  );
};

export default Layout;
