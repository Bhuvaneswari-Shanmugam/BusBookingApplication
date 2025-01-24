import React, { useState, useEffect, useRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearchTripsMutation } from '../redux/services/TripApi';
import { locations, busDetails } from '../constants';
import { useForm, Controller } from 'react-hook-form';
import { validationSchema } from '../utils/schema/validationSchema';
import Footer from '../components/layout/Footer';
import DropDown from '../components/DropDown';
import Card from '../components/Card';
import homeBus from '../assets/homeBus.png';
import Header from '../components/layout/Header';
import Toast from '../components/Toast';
import '../App.css'; 

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state?.bookingDetails;
  const [ticket, setTicket] = useState<null>(null);
  const [searchTrips] = useSearchTripsMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'info' | 'success' | 'error'>('info'); 
  const [showToast, setShowToast] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      pickupPoint: '',
      destinationPoint: '',
      pickupDate: '', 
    },
  });
  const currentDate = new Date().toISOString().split('T')[0];

  const handleBookNowClick = async (data: any) => {
    if (isLoading) return; 
    setIsLoading(true);

    try {
      const tripExists = await searchTrips({
        pickupPoint: data.pickupPoint,
        destinationPoint: data.destinationPoint,
        pickupTime: data.pickupDate,
      }).unwrap();
      if (tripExists) {
        navigate('/buses', {
          state: {
            from: data.pickupPoint,
            to: data.destinationPoint,
            date: data.pickupDate,
          },
        });
        setToastMessage('Trips found! Redirecting...');
        setToastType('success');
        setShowToast(true);
      } else {
        setToastMessage('No trips available for the given criteria.');
        setToastType('error');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Failed to search for trips:', error);
      setToastMessage('Failed to search for trips. Please try again.');
      setToastType('error');
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (bookingDetails) {
      setTicket(bookingDetails);
      setValue('pickupPoint', bookingDetails.pickupPoint || '');
      setValue('destinationPoint', bookingDetails.destinationPoint || '');
      setValue('pickupDate', bookingDetails.pickupDate || '');
    }
  }, [bookingDetails, setValue]);

  const scrollToSearchContainer = () => {
    if (searchContainerRef.current) {
      searchContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div>
      <Header />
      <div className="home-container d-flex">
        <div className="button-container">
          <h1 style={{ color: '#B966E2' }}>
            Reserve Your Bus
            <span className="ticket" style={{ color: '#B966E2' }}>
              Tickets
            </span>
            Now
          </h1>
          <p>
            Find and book your bus tickets with just a few clicks. We offer a wide range of bus routes and schedules to suit your needs.
          </p>
          <div className="home-btn d-flex justify-content-between" style={{ gap: '10px' }}>
            <button onClick={scrollToSearchContainer}>Book Now</button>
            <button onClick={() => navigate('/booking-details')}>Booking Details</button>
          </div>
        </div>
        <div className="right-img-container">
          <img src={homeBus} alt="homepage-right-img" />
        </div>
      </div>

      <div ref={searchContainerRef} className="card search-container mt-4">
        <form onSubmit={handleSubmit(handleBookNowClick)}>
          <div className="row g-3 d-flex align-items-center">
            <div className="col-md-4">
              <Controller
                name="pickupPoint"
                control={control}
                render={({ field }) => (
                  <DropDown
                    {...field}
                    className="custom-dropdown"
                    options={locations}
                    text="Select Pickup Point"
                  />
                )}
              />
              {errors.pickupPoint && <div className="text-danger">{errors.pickupPoint?.message}</div>}
            </div>
            <div className="col-md-4">
              <Controller
                name="destinationPoint"
                control={control}
                render={({ field }) => (
                  <DropDown
                    {...field}
                    className="custom-dropdown"
                    options={locations}
                    text="Select Destination Point"
                  />
                )}
              />
              {errors.destinationPoint && (
                <div className="text-danger ">{errors.destinationPoint?.message}</div>
              )}
            </div>
            <div className="col-md-2">
              <Controller
                name="pickupDate"
                control={control}
                render={({ field }) => (
                  <input
                    type="date"
                    className="form-control input-custom"
                    style={{ borderColor: 'darkorchid' }}
                    {...field}
                    min={currentDate}
                    value={field.value || ''} 
                  />
                )}
              />
              {errors.pickupDate && <div className="text-danger">{errors.pickupDate?.message}</div>}
            </div>
            <div className="col-md-2">
              <button
                className="search-btn"
                style={{
                  width: '150px',
                  height: '40px',
                  backgroundColor: 'darkorchid',
                  color: 'white',
                }}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="container mt-5">
        <Card
          header="Available Buses"
          description={
            <div className="bus-container">
              <div className="row g-4 d-flex flex-column align-items-center">
                {busDetails.map((bus, index) => (
                  <div key={index} className={`col d-flex align-items-${bus.alignment} mb-3`} style={{ width: '80%' }}>
                    <img src={bus.imgSrc} alt="bus" width={bus.imgWidth} height={bus.imgHeight} className="me-4" />
                    <div>
                      <h5 className="mb-2">{bus.title}</h5>
                      <p>{bus.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
        />
        <Card
          header="BOOK BUS TICKETS ONLINE"
          description={
            <>
              <p className="card-text mb-3">
                Bigtraze Travels is India's largest brand for online bus ticket booking and offers an easy-to-use online bus and train ticket booking; with over 36 million satisfied customers, 3500+ bus operators to choose from, and plenty of offers on bus ticket booking, redBus makes road journeys super convenient for travellers.
              </p>
              <p className="card-text">
                Booking a bus ticket online on the redBus app or website is very simple. You can download the redBus app or visit redbus.in and enter your source, destination & travel date to check the top-rated bus services available. Make a quick selection and book bus tickets online.
              </p>
            </>
          }
        />
      </div>
      <Footer />

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          duration={3000}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default Home;
