import React, { useState } from 'react';
import { BusCardProps } from '../utils/entity/PageEntity';
import { colors } from '../constants/Palette';
import Badge from './Badge';
import { FaStar } from 'react-icons/fa';
import seat from '../assets/seat.jpg';
import Button from './Button';
import PointSelectionCard from './selectionPoint';

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
  const [currentSelectedSeats, setCurrentSelectedSeats] = useState<string[]>(selectedSeats.map(String));
  const [currentTotalPrice, setCurrentTotalPrice] = useState<number>(totalPrice);
  const [showCard, setShowCard] = useState(false);
  const [showTripCard, setShowTripCard] = useState(false);

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
  

  return (
    <div key={bus.number} className="card p-4 mb-2 " style={{ width: '2200px' }}>
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
                <div className="d-flex justify-content-between align-items-start text-start">
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
              <PointSelectionCard
                totalPrice={currentTotalPrice}
                bus={bus}
                currentSelectedSeats={currentSelectedSeats.map(Number)}
                date={date}
                
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BusCard;
