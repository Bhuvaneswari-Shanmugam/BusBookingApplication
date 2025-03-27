import React, { useState, useEffect } from 'react';
import TripDetailsModal from '../components/TripDetails';
import { BusCardProps } from '../utils/entity/PageEntity';
import { colors } from '../constants/Palette';
import Badge from './Badge';
import { FaStar } from 'react-icons/fa';
import seat from '../assets/seat.jpg';
import Button from './Button';
import { useGetBusBoardingPointQuery, useGetBusDroppingPointQuery } from '../redux/services/BusApi';
 
const BusCard: React.FC<BusCardProps> = ({
  bus,
  date,
  selectedBus,
  selectedSeats,
  bookedSeats,
  viewSeats,
  rows,
  toggleSeatSelection,
  handleBusClick,
  totalPrice,
  genderSeats,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [currentSelectedSeats, setCurrentSelectedSeats] = useState<string[]>(selectedSeats.map(String));
  const [currentTotalPrice, setCurrentTotalPrice] = useState<number>(totalPrice);
  const [showCard, setShowCard] = useState(false);
  const [boardingPoints, setBoardingPoints] = useState<{ location: string; time: string }[]>([]);
  const [droppingPoint, setDroppingPoints]=useState<{location:string; time:string}[]>([]);
 
 
  const busId = bus?.id;
  const { data, error, isLoading, refetch } = useGetBusBoardingPointQuery(busId ? { id: busId } : {});
 
  const { data: droppingData, error: droppingError, isLoading: droppingIsLoading, refetch: refetchDropping } = useGetBusDroppingPointQuery(busId ? { id: busId } : {});
 
  const handleProceedBooking = () => {
    setShowModal(true);
  };
 
  const handleCloseModal = () => {
    setShowModal(false);
  };
 
  const handleSeatSelection = (seatNumber: string, event: React.MouseEvent) => {
    if (bookedSeats.includes(Number(seatNumber)) || genderSeats.femaleSeats.includes(Number(seatNumber))) {
      return;
    }
 
    toggleSeatSelection(Number(seatNumber), event);
 
    let updatedSelectedSeats = [...currentSelectedSeats];
    if (updatedSelectedSeats.includes(seatNumber)) {
      updatedSelectedSeats = updatedSelectedSeats.filter((seat) => seat !== seatNumber);
    } else {
      updatedSelectedSeats.push(seatNumber);
    }
 
    const newTotalPrice = updatedSelectedSeats.length * bus.expense;
    setCurrentSelectedSeats(updatedSelectedSeats);
    setCurrentTotalPrice(newTotalPrice);
    setShowCard(updatedSelectedSeats.length > 0);
  };
 
  const handleBoardingPointClick = async () => {
    if (busId) {
      console.log(busId)  
         try {
        const result = await refetchDropping();
        if (result.data) {
          setBoardingPoints([{ location: result.data.location, time: result.data.time }]);
          console.log(result.data.location, result.data.time);
        }
      } catch (error) {
        console.error('Error fetching boarding points:', error);
      }
    }
  };
 
  const handleDroppingPointClick=async()=>{
    if(busId){
      try{
        const result = await refetch();
        if(result.data){
          setDroppingPoints([{location:result.data.location, time:result.data.time}]);
          console.log(result.data.location, result.data.time)
        }
      }
      catch(error){
        console.error('Error fetching boarding points',error)
      }
    }}
 
  return (
    <div key={bus.number} className="card p-4 mb-2" style={{ width: '2200px' }}>
      <div className="card-content d-flex justify-content-between align-items-center">
        <div>
          <h5>{bus.name}</h5>
          <p>{bus.busType}/{bus.busCategory}</p>
        </div>
        <div>
          <h5>{bus.departureTime}</h5>
          <p>{bus.pickupPoint}</p>
        </div>
        <div>
          <h5>{bus.duration}</h5>
        </div>
        <div>
          <h5>{bus.arrivalTime}</h5>
          <p>{bus.droppingPoint}</p>
        </div>
        <Badge
          label={bus.ratings.toString()}
          icon={<FaStar />}
          className="ms-2 bg-success"
        />
        <div>{bus.expense}</div>
        <Button
          onClick={() => handleBusClick(bus)}
          style={{
            backgroundColor: 'darkorchid',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            height: '30px',
            width: '110px',
          }}
        >
          {selectedBus?.number === bus.number && viewSeats ? 'Close' : 'View Seats'}
        </Button>
      </div>
 
      <hr style={{ height: '2px', border: 'none', backgroundColor: 'black' }} />
 
      {selectedBus && selectedBus.number === bus.number && viewSeats && (
        <div className="d-flex justify-content-between">
          <div className="bus" style={{ flexGrow: '1', marginRight: '20px' }}>
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="bus-row">
                {row.map((seatNumber, seatIndex) =>
                  seatNumber === null ? (
                    <div
                      key={seatIndex}
                      className="empty-space"
                      style={{ width: '40px', height: '40px', margin: '3px' }}
                    />
                  ) : (
                    <div
                      key={seatNumber}
                      className={`seat ${currentSelectedSeats.includes(seatNumber.toString()) ? 'selected' : ''}`}
                      onClick={(e) => {
                        if (
                          bookedSeats.includes(Number(seatNumber)) ||
                          genderSeats.femaleSeats.includes(Number(seatNumber)) ||
                          !genderSeats.availableSeats.includes(Number(seatNumber))
                        ) {
                          return;
                        }
                        handleSeatSelection(seatNumber.toString(), e);
                      }}
                      style={{
                        width: '40px',
                        height: '40px',
                        margin: '3px',
                        cursor:
                          bookedSeats.includes(seatNumber) ||
                          genderSeats.femaleSeats.includes(seatNumber) ||
                          !genderSeats.availableSeats.includes(seatNumber)
                            ? 'not-allowed'
                            : 'pointer',
                        backgroundColor:
                          genderSeats.femaleSeats.includes(seatNumber)
                            ? colors.pagecolor
                            : genderSeats.maleSeats.includes(seatNumber)
                              ? colors.secondary
                              : 'transparent',
                        backgroundImage:
                          genderSeats.femaleSeats.includes(seatNumber) ||
                            genderSeats.maleSeats.includes(seatNumber)
                            ? 'none'
                            : `url(${seat})`,
                        backgroundSize: 'cover',
                        border:
                          currentSelectedSeats.includes(seatNumber.toString())
                            ? `3px solid ${colors.success}`
                            : genderSeats.femaleSeats.includes(seatNumber)
                              ? `2px solid ${colors.pagecolor}`
                              : genderSeats.maleSeats.includes(seatNumber)
                                ? `2px solid ${colors.secondary}`
                                : genderSeats.availableSeats.includes(seatNumber)
                                  ? `2px solid ${colors.lightGray}`
                                  : '2px solid transparent',
                      }}
                    >
                      {seatNumber}
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
          <div className="seat-legend-container" style={{ marginLeft: '200px', flexShrink: 0 }}>
            {!showCard && (
              <div className="seat-legend" style={{ marginTop: '20px' }}>
                <strong className="align-items-start">SEAT LEGEND</strong>
                <div className=" d-flex justify-content-between align-items-start text-start">
                  <div className="legend-item d-flex align-items-center" style={{ marginRight: '20px' }}>
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        border: `2px solid ${colors.success}`,
                        marginRight: '8px',
                      }}
                    ></div>
                    <h5 className="text-secondary" style={{ margin: '0' }}>Selected</h5>
                  </div>
                  <div className="legend-item d-flex align-items-center" style={{ marginRight: '20px' }}>
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: colors.pagecolor,
                        border: `2px solid ${colors.pagecolor}`,
                        marginRight: '8px',
                      }}
                    ></div>
                    <h5 className="text-secondary" style={{ margin: '0' }}>Female</h5>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="legend-item d-flex align-items-center" style={{ marginRight: '20px' }}>
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: colors.lightGray,
                        border: `2px solid ${colors.lightGray}`,
                        marginRight: '8px',
                      }}
                    ></div>
                    <h5 className="text-secondary" style={{ margin: '0' }}>Unavailable</h5>
                  </div>
                  <div className="legend-item d-flex align-items-center">
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: 'transparent',
                        border: `2px solid ${colors.lightGray}`,
                        marginRight: '8px',
                      }}
                    ></div>
                    <h5 className="text-secondary" style={{ margin: '0' }}>Available</h5>
                  </div>
                </div>
              </div>
            )}
            {showCard && (
              <div className="card bg-light w-100" style={{ paddingRight: '10px', flexShrink: 0 }}>
                <h5>Select the Boarding & Dropping Point</h5>
 
                <hr style={{ borderTop: '2px dotted #000000' }} />
                <div className="1 ">
                <Button
                  className="border-0 w-50 text-dark"
                  style={{ backgroundColor: colors.background }}
                  onClick={handleBoardingPointClick}
                >
                  Boarding Point
                </Button>
             
 
                {isLoading && <p>Loading...</p>}
 
                <Button className="border-0 w-50 text-dark"
                style={{background: 'none'  }}
                  onClick={handleDroppingPointClick}
             
                >
                  Dropping Point
                </Button>
                  </div>
 
                {boardingPoints && (
                  <div>
                    <ul>
                      {boardingPoints.map((point, index) => (
                        <li key={index}>{point.location} - {point.time}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {[{ label: 'Total Amount', value: `₹${currentTotalPrice}` }].map(({ label, value }) => (
                  <div key={label}>
                    <div className="summary-item d-flex align-items-end" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      {label !== 'Total Price' && <label htmlFor={label}>{label}:</label>}
                      <span className="">{value}</span>
                      <br />
                    </div>
                    <div style={{}}>
                      <Button
                        className="pay-button btn text-white border-0 w-100"
                        style={{ backgroundColor: colors.pagecolor }}
                        onClick={handleProceedBooking}
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="btn-container d-flex justify-content-between mt-5"></div>
              </div>
            )}
          </div>
        </div>
      )}
 
      <TripDetailsModal
        show={showModal}
        onClose={handleCloseModal}
        onProceed={() => {
          handleCloseModal();
        }}
        bus={bus}
        currentSelectedSeats={currentSelectedSeats}
        selectedDroppingPoints={new Set<string>()}
        selectedPickupPoints={new Set<string>()}
        date={date}
      />
    </div>
  );
};
 
export default BusCard;
 