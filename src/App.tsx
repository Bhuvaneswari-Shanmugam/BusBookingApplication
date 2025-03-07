import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import PassengerDetailsForm from './pages/booking/PassengerDetails';
import Ticket from './pages/booking/Ticket';
import Signin from './pages/auth/Signin';
import store from '../src/redux/store';
import Layout from './components/layout/Index';
import Signup from './pages/auth/Signup';
import ProtectedRoute from './routes/Index';
import Home from './pages/Home';
import MissMatch from './pages/MissMatch';
import Profile from './pages/profile';
import ProfileLayout from './components/ProfileLayout';
import TripDetailsModal from './components/TripDetails';
import { defaultBusValues } from './utils/entity/PageEntity';
import { BookingProvider } from './context/BookingProvider';
import TripInfo from './pages/admin/tripView';
import AdminLayout from './pages/admin/AdminLayout';
import SeatManagement from './pages/admin/SeatDetail';
import CustomerDetails from './pages/admin/CustomerDetails';
import BusDetails from './pages/admin/BusDetails';
import AllBookingDetails from './pages/admin/BookingDetails';
import MainBus from './pages/booking/MainBus';

const App = () => {
  return (
    <Provider store={store}>
      <BookingProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
            </Route>


            <Route element={<ProtectedRoute />}>
              <Route path="*" element={<MissMatch />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/ticket" element={<Ticket />} />
              <Route path="/profile-layout" element={<ProfileLayout />} />
              <Route path="/trip-details" element={<TripDetailsModal bus={defaultBusValues} date="" />} />
              <Route path="/passenger-details" element={<PassengerDetailsForm />} />
              <Route path="/buses" element={<MainBus />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<CustomerDetails />} />
                <Route path="/customer-details" element={<CustomerDetails/>} />
                <Route path="/bus-details" element={<BusDetails />} />
                <Route path="/trip-info" element={<TripInfo />} />
                <Route path="seat" element={<SeatManagement />} /> 
               <Route path="/all-booking-details" element={<AllBookingDetails />} />
           
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </BookingProvider>
    </Provider>
  );
};

export default App;