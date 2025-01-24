import { useLocation, Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from '../../components/layout/Header';


const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/home';
   return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {isHomePage && <Header />}
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
