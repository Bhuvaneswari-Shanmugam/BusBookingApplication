import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Signup from './pages/Signup';
import PassengerDetailsForm from './pages/PassengerDetails';
import Ticket from './pages/Ticket';
import Signin from '../src/pages/Signin';
import store  from '../src/redux/store'; 




const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<h1>Page not found</h1>} />
          <Route path="/ticket" element={<Ticket/>}/>
          <Route path="passenger-details" element={<PassengerDetailsForm />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;