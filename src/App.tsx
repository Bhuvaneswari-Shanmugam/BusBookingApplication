import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import PassengerDetailsForm from './pages/auth/PassengerDetails';
import Ticket from './pages/auth/Ticket';
import Signin from './pages/auth/Signin';
import store from '../src/redux/store';
import Layout from './components/layout/Index';
import Signup from './pages/auth/Signup';
//import Passenger from './pages/auth/Passenger';
//import Payment from './pages/auth/Payment';


const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
        <Route element={<Layout />}>
            <Route path="/" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Route>


          <Route path="*" element={<h1>Page not found</h1>} />
          <Route path="/ticket" element={<Ticket />} />
          {/* <Route path="/payment" element={<Payment />}/>
          <Route path="/passenger" element={<Passenger/>}/> */}
          <Route path="passenger-details" element={<PassengerDetailsForm />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;