import React, { useState, useRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearchTripsMutation } from '../redux/services/TripApi';
import { locations, busDetails, contactDetails, services, countries } from '../constants';
import { useForm, Controller } from 'react-hook-form';
import { validationSchema } from '../utils/schema/validationSchema';
import DropDown from '../components/DropDown';
import Card from '../components/Card';
import homeBus from '../assets/homeBus.png';
import Header from '../components/layout/Header';
import Toast from '../components/Toast';
import Button from '../components/Button';
import Input from '../components/Input'
import { InputData } from '../utils/entity/PageEntity';
import '../App.css';
import { colors } from '../constants/Palette';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTrips] = useSearchTripsMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'info' | 'success' | 'error'>('info');
  const [showToast, setShowToast] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const aboutCardRef = useRef<HTMLDivElement>(null);

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

  const handleBookNowClick = async (data: InputData) => {
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
      setToastMessage('Failed to search for trips. Please try again.');
      setToastType('error');
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };
  const scrollToSearchContainer = () => {
    if (searchContainerRef.current) {
      searchContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div>
      <Header aboutCardRef={aboutCardRef} />
      <div className="home-container min-vh-100 w-100 position-relative overflow-hidden">
        <div className="button-container " style={{ fontSize: '70px' }}>
          <h1 style={{ color: '#B966E2', fontSize: '70px' }}>
            Reserve Your Bus
            <span className="ticket" style={{ color: '#B966E2' }}>
              Tickets
            </span>
            Now
          </h1>
          <p style={{ fontSize: '20px', color: '#f5f5f5', width: '500px' }}>
            Find and book your bus tickets with just a few clicks. We offer a wide range of bus routes and schedules to suit your needs.
          </p>
          <div className="home-btn d-flex justify-content-between border-0" style={{ gap: '20px' }}>
            <Button className="border-0 text-white" onClick={scrollToSearchContainer} style={{ width: '250px', height: '45px', backgroundColor: 'darkorchid', borderRadius: '7px', fontSize: '20px', paddingRight: '4px' }}>Book Now</Button>
            <Button className='border-0 text-white' onClick={() => navigate('/booking-details')} style={{ gap: '20px', width: '250px', height: '45px', backgroundColor: 'darkorchid', borderRadius: '7px', fontSize: '20px', paddingRight: '4px' }}>Booking Details</Button>
          </div>
        </div>
        <div className="right-img-container" style={{ position: 'absolute', bottom: '20px', right: '20px', minHeight: '500px', minWidth: '500px' }}>
          <img src={homeBus} alt="homepage-right-img" height={'450px'} />
        </div>
      </div>

      <div ref={searchContainerRef} className="card search-container mt-4">
        <form onSubmit={handleSubmit(handleBookNowClick)}>
          <div className="row g-3 d-flex align-items-center">
            <div className="col-md-4 mb-3">
              <Controller
                name="pickupPoint"
                control={control}
                render={({ field }) => (
                  <DropDown
                    {...field}
                    className='drop-down'
                    options={locations}
                    text="Select Pickup Point"
                    style={{
                      select: { width: '250px', height: '40px', padding: '5px', fontSize: '16px', borderRadius: '5px', border: '1px solid #B966E2', color: '#333',borderColor:colors.pagecolor}
                    }}
                  />
                )}
              />
               <div className="float-start">
              <span className="error text-danger">{errors.pickupPoint?.message}</span>
              </div>
            </div>

            <div className="col-md-4">
              <Controller
                name="destinationPoint"
                control={control}
                render={({ field }) => (
                  <DropDown
                    {...field}
                    className="drop-down"
                    text="Select Destination Point"
                    options={locations}
                    style={{
                      select: {width:'250px', height: '40px', padding: '5px', fontSize: '16px', borderRadius: '5px', border: '1px solid #B966E2', color: '#333',borderColor:colors.pagecolor},
                      option: {},
                    }}
                  />
                )}
              />
               <div className="">
              <span className="error text-danger">{errors.destinationPoint?.message}</span>
              </div>
            </div>
            <div className="col-md-2">
              <Controller
                name="pickupDate"
                control={control}
                render={({ field }) => (
                  <Input
                    type="date"
                    className="form-control input-custom"
                    style={{ borderColor: 'darkorchid' }}
                    {...field}
                    min={currentDate}
                    value={field.value || ''}
                  />
                )}
              />
               <div className="float-start ">
              <span className="error text-danger">{errors.pickupDate?.message}</span>
              </div>
            </div>

            <div className="col-md-2">
              <Button
                className="search-btn"
                style={{
                  width: '150px',
                  border: 'none',
                  borderRadius: '4px',
                  height: '40px',
                  backgroundColor: 'darkorchid',
                  color: 'white',
                  cursor: 'pointer'
                }}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </div>
        </form>
      </div>

      <div className="container mt-5">
        <Card

          description={
            <div className="bus-container">
              <h4>AVAILABLE BUSES</h4>
              <br></br>
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

          description={
            <>
              <h4>MAKE AN ONLINE BUS RESERVATION</h4>
              <p className="card-text mb-3">
                Bigtraze Travels is India's largest brand for online bus ticket booking and offers an easy-to-use online bus and train ticket booking; with over 36 million satisfied customers, 3500+ bus operators to choose from, and plenty of offers on bus ticket booking, redBus makes road journeys super convenient for travellers.
              </p>
              <p className="card-text">
                Booking a bus ticket online on the bigtranz  app or website is very simple. You can download the bigtranz app or visit bigtranz.in and enter your source, destination & travel date to check the top-rated bus services available. Make a quick selection and book bus tickets online.
              </p>
            </>
          }
        />
         <div ref={aboutCardRef}>
        <Card
          description={
            <>
              <h4>ABOUT BIGSTANZ</h4>
              <p className="card-text mb-3">
                Welcome to BigStanz! your reliable partner for bus travel bookings! Whether you're commuting for work, going on a weekend getaway, or traveling for leisure, our app ensures you can easily find, book, and manage your bus tickets with just a few taps.
              </p>
            </>
          }
        />
      </div>

        <Card description={
            <>
              <h5>CONTACT US</h5>
              {contactDetails.map((contact, index) => (
                <p key={index} className={index === 2 ? 'mb-0' : 'mb-2'}>
                  {contact.label}: {contact.value}
                </p>
              ))}
            </>
          }/>
        <Card description={
            <>
              <h5>SERVICES</h5>
              <ul className='list-unstyled'>
                {services.map((service, index) => (
                  <li key={index} className={index === services.length - 1 ? 'mb-0' : 'mb-2'}>
                    {service}
                  </li>
                ))}
              </ul>
            </>
          }
        />
       <Card description={
            <><h5>GLOBAL SITES</h5>
              <ul className='list-unstyled'>
                {countries.map((country: string, index: number) => (
                  <li className={index === countries.length - 1 ? 'mb-0' : 'mb-2'} key={country}>
                    {country}
                  </li>
                ))}
              </ul>
            </>
          }/>
       </div>
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
