
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store  from '../src/redux/store'; 
import MissMatch from './pages/MissMatch';
import Home from './pages/Home'
import AvailableBuses from './pages/booking/AvailableBuses';
import Filters from './pages/filters/Filters';
import PickUpPoints from './pages/filters/PickUpPoints';
import DroppingPoints from './pages/filters/DroppingPoints';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/buses" element={<AvailableBuses />} />
          <Route path="/filters" element={<Filters />} />
          <Route path="/pickup" element={<PickUpPoints onClose={() => {}} />}/>
          <Route path="/dropin" element={<DroppingPoints onClose={()=>{}} />} />
          <Route path="*" element={<MissMatch/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;