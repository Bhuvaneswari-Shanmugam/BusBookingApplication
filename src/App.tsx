import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MissMatch from './pages/MissMatch';
import AvailableBuses from './pages/booking/AvailableBuses';
import Home from '../src/pages/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buses" element={<AvailableBuses />} />
        <Route path="*" element={<MissMatch />} />
      </Routes>
    </BrowserRouter>

  );
};

export default App;