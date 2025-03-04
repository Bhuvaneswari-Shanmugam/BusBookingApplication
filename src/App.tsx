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
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/ticket" element={<Ticket />} />
              <Route path="/profile-layout" element={<ProfileLayout />} />
              <Route path="/trip-details" element={<TripDetails  bus={defaultBusValues} date="" />}/>
              <Route  path="/passenger-details" element={<PassengerDetailsForm />}/>                                                                                         
            </Route>
            
          
          </Routes>
        </BrowserRouter>
      </BookingProvider>
    </Provider>
  );
};

export default App;