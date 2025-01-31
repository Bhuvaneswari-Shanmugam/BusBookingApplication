import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
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
import { BookingDetails } from './utils/entity/PageEntity';
import { Navigate } from 'react-router-dom';
import Success from './pages/auth/SuccessPayment';



const App = () => {

  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
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
            <Route path="/buses" element={<AvailableBuses />} />
            <Route path="/success" element={<Success/>}/>
            {/* <Route path="passenger-details" element={<PassengerDetailsForm bookedNoOfSeats={bookedNoOfSeats} totalPrice={totalPrice} />} /> */}
            <Route
              path="/passenger-details"
              element={bookingDetails ? <PassengerDetailsForm bookingDetails={bookingDetails} /> : <Navigate to="/home" />}
            />

          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;