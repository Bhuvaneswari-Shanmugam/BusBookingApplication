import { useLocation, Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from '../../components/layout/Header';

const Layout = () => {
  const location = useLocation();
  const showNavbar = [ '/home'];
  const showFooter = location.pathname === '/home';

  return (
    <div>
      <header>
        {showNavbar.includes(location.pathname) && <Header />} 
      </header>
      
       <main>
        <Outlet /> 
      </main>
      
      {showFooter && (
        <footer>
          <Footer />
        </footer>
      )}
    </div>
  );
};
export default Layout;
