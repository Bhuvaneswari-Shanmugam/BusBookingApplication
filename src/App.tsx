import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import PassengerDetailsForm from './pages/auth/PassengerDetails';
import Ticket from './pages/auth/Ticket';
import Signin from './pages/auth/Signin';
import store from '../src/redux/store';
import Layout from './components/layout/Index';
import Signup from './pages/auth/Signup';
import ProtectedRoute from './routes/Index';
import Home from './pages/Home';
import AvailableBuses from './pages/booking/AvailableBuses';
import MissMatch from './pages/MissMatch';
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="*" element={<MissMatch />} />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/home" element={<Home />} />
            <Route path="/buses" element={<AvailableBuses  />} />
            <Route path="passenger-details" element={<PassengerDetailsForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;