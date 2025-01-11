import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import PassengerDetailsForm from './pages/PassengerDetails';
import Ticket from './pages/Ticket';
import Signin from './pages/auth/Signin';
import store from '../src/redux/store';
import Layout from './components/layout/Index';
import Signup from './pages/Signup';




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
          <Route path="passenger-details" element={<PassengerDetailsForm />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;