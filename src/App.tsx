import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import PassengerDetailsForm from './pages/auth/PassengerDetails';
import Signin from './pages/auth/Signin';
import Layout from './components/layout/Index';
import Signup from './pages/auth/Signup';
import ProtectedRoute from './routes/Index';
import Home from './pages/Home';
import AvailableBuses from './pages/booking/AvailableBuses';
import Profile from './pages/auth/Profile';
import MissMatch from './pages/MissMatch';
import Ticket from './pages/auth/Ticket';
import { BookingProvider } from './context/BookingProvider';
import store from '../src/redux/store';
import { defaultBusValues } from '../src/utils/entity/PageEntity';
import TripDetails from './components/TripDetails';
import ProfileLayout from './components/layout/ProfileLayout';
import CancelTicket from './pages/auth/CancelTicket';
import ProfileWrapper from './pages/auth/ProfileWrapper';
import TripHistory from './pages/TripHistory';
import AdminLayout from './pages/admin/AdminLayout';
import CustomerDetails from './pages/admin/CustomerDetails';
import BusDetails from './pages/admin/BusDetails';
import TripInfo from './pages/admin/TripView';
import AllBookingDetails from './pages/admin/BookingDetails';
import ShowTickets from './pages/ShowTickets';

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
              <Route path="/buses" element={<AvailableBuses />} />
              <Route path="/ticket" element={<Ticket />} />
              <Route path="/trip-details" element={<TripDetails bus={defaultBusValues} date="" />} />
              <Route path="/passenger-details" element={<PassengerDetailsForm />} />

              <Route element={<ProfileLayout />}>
                <Route path="/profile-layout" element={<ProfileWrapper />} />
                <Route path="/cancel-ticket" element={<CancelTicket />} />
                <Route path="/trip-history" element={<TripHistory />} />
                <Route path="/show-my-tickets" element={<ShowTickets />} />
              </Route>

              <Route element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<CustomerDetails />} />
                <Route path="/customer-details" element={<CustomerDetails/>} />
                <Route path="/bus-details" element={<BusDetails />} />
                <Route path="/trip-info" element={<TripInfo />} />
               <Route path="/all-booking-details" element={<AllBookingDetails />} />
              </Route>
            </Route>

            </Route>

          </Routes>
        </BrowserRouter>
      </BookingProvider>
    </Provider >
  );
};

export default App;