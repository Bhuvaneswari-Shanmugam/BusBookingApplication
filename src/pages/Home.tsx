import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import '../App.css';
import { useSearchTripsMutation } from '../redux/services/TripApi';
// import HomeBus from '../assets/homeBus.png';
// import bus1 from '../assets/cat-bus1.png';
// import bus2 from '../assets/cat-bus2.png';
// import bus3 from '../assets/cat-bus3.jpg';
import Footer from '../components/layout/Footer'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state?.bookingDetails;

  const [pickupPoint, setPickupPoint] = useState('');
  const [destinationPoint, setDestinationPoint] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [ticket, setTicket] = useState(null);
  const [searchTrips] = useSearchTripsMutation();
  const locations = ['Salem', 'Namakkal', 'Chennai', 'Coimbatore', 'Bangalore'];

  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bookingDetails) {
      setTicket(bookingDetails);
    }
  }, [bookingDetails]);

  const [isLoading, setIsLoading] = useState(false);

  const handleBookNowClick = async () => {
    if (!pickupPoint || !destinationPoint || !pickupDate) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (pickupPoint === destinationPoint) {
      toast.error('Pickup and destination points cannot be the same.');
      return;
    }

    navigate('/pickup', {
      state: { from: pickupPoint, to: destinationPoint, date: pickupDate } 
    });

    setIsLoading(true);
    try {
      const tripExists = await searchTrips({
        pickupPoint,
        destinationPoint,
        pickupTime: pickupDate,
      }).unwrap();

      setIsLoading(false);

      if (tripExists) {
        toast.success('Trips found!');
        navigate('/buses', {
          state: {
            from: pickupPoint,
            to: destinationPoint,
            date: pickupDate,
          },
        });
      } else {
        toast.error('No trips available for the given criteria.');
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Failed to search for trips:', error);
      toast.error((error as any)?.message || 'Failed to search for trips. Please try again.');
    }
  };

  const scrollToSearchContainer = () => {
    if (searchContainerRef.current) {
      searchContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Header />
      <div className="home-container d-flex">
        <div className="button-container">
          <h1>
            Reserve Your Bus
            <span className="ticket" style={{ color: '#B966E2' }}>
              Tickets
            </span>
            Now
          </h1>
          <div>
            <p>
              Find and book your bus tickets with just a few clicks. We offer a wide range of bus routes and schedules to suit your needs.
            </p>
          </div>
          <div className="home-btn d-flex justify-content-between" style={{ gap: '15px' }}>
            <button onClick={() => { scrollToSearchContainer(); }}>Book Now</button>
            <button onClick={() => { navigate("/booking-details") }}>Booking Details</button>
          </div>
        </div>
        <div className="right-img-container">
          <img src="" alt="homepage-right-img" />
        </div>
      </div>

      <div ref={searchContainerRef} className="card search-container shadow-lg">
        <div className="row g-3">
          <div className="col">
            <select
              className="form-control input-custom"
              value={pickupPoint}
              onChange={(e) => setPickupPoint(e.target.value)}
            >
              <option value="" disabled>
                From
              </option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <select
              className="form-control input-custom"
              value={destinationPoint}
              onChange={(e) => setDestinationPoint(e.target.value)}
            >
              <option value="" disabled>
                To
              </option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <input
              type="date"
              className="form-control input-custom"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
          </div>
          <div className="col">
            <button
              className="search-btn"
              style={{
                width: '280px',
                height: '40px',
                backgroundColor: 'darkorchid',
                color: 'white',
              }}
              onClick={handleBookNowClick}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="text-center my-2">Available Buses</h2>
            <div className="bus-container">
              <div className="row g-4 d-flex flex-column align-items-center">
                <div className="col d-flex align-items-center mb-3" style={{ width: '80%' }}>
                  <img src="" alt="bus" width="200px" height="110px" className="me-4" />
                  <div>
                    <h5 className="mb-2">Luxury Travel</h5>
                    <p>As India's infrastructure continues to evolve, the demand for comfortable and efficient travel options is on the rise. Whether it's long-distance travel, corporate commuting, or tourist excursions, Bigtraze Travels provides the perfect solution.</p>
                  </div>
                </div>
                <div className="col d-flex align-items-center mb-3" style={{ width: '80%' }}>
                  <img src="" alt="bus" width="200px" height="110px" className="me-4" />
                  <div>
                    <h5 className="mb-2">AC Bus Travel</h5>
                    <p>Bus air conditioners are indispensable for providing a comfortable and enjoyable journey for passengers. Understanding the benefits and maintenance tips associated with bus air conditioners can enhance passenger experience.</p>
                  </div>
                </div>
                <div className="col d-flex align-items-start mb-3" style={{ width: '80%' }}>
                  <img src="" alt="bus" width="330px" height="150px" className="me-4" />
                  <div>
                    <h5 className="mb-2">Non-AC Bus Travel</h5>
                    <p>The all-new BS VI Range of Starbus comes with unmatched features of excellent seating comfort with wider seats, armrests, mobile chargers, more leg space, reclining seats, improved suspension and reduced NVH, making it convenient and comfortable for passengers.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="text-container mt-5">
          <div className="card shadow-lg border-0 rounded-3">
            <div className="card-body p-4">
              <h5 className="card-title text-center mb-4">BOOK BUS TICKETS ONLINE</h5>
              <p className="card-text mb-3">
                Bigtraze Travels is India's largest brand for online bus ticket booking and offers an easy-to-use online bus and train ticket booking; with over 36 million satisfied customers, 3500+ bus operators to choose from, and plenty of offers on bus ticket booking, redBus makes road journeys super convenient for travellers. A leading platform for booking bus tickets, redBus has been the leader in online bus booking over the past 17 years across thousands of cities and lakhs of routes in India.
              </p>
              <p className="card-text">
                Booking a bus ticket online on the redBus app or website is very simple. You can download the redBus app or visit redbus.in and enter your source, destination & travel date to check the top-rated bus services available. Make a quick selection and book bus tickets online.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      <ToastContainer />
    </div>
  );
};

export default Home;
