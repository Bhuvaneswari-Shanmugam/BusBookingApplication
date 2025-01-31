import React from 'react';
import seat from '../assets/seat.jpg';
import { BusCardProps } from '../utils/entity/PageEntity';

const BusCard: React.FC<BusCardProps> = ({
  bus,
  from,
  to,
  date,
  selectedBus,
  selectedSeats,
  bookedSeats,
  viewSeats,
  rows,
  toggleSeatSelection,
  handleBusClick,
  handlePayment,
  handleDownloadTicket,
  totalPrice,
}) => {
  return (
    <div key={bus.number} className="card p-4 mb-2 w-100" style={{ marginLeft: '5px', marginRight: '0px' }}>
      <div className="card-content d-flex justify-content-between align-items-center">
        <div>
          <h5>{bus.name}</h5>
          <p>{bus.type}</p>
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
      
        <button
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
        </button>
      </div>

      <hr style={{ height: '2px', border: 'none', backgroundColor: 'black' }} />

      {selectedBus && selectedBus.number === bus.number && viewSeats && (
        <>
          <div className="hide-content d-flex justify-content-around">
            <div className="" style={{ paddingRight: '10px', marginLeft: '150px' }}>
              <h4>Booking Summary</h4>
              {[{ label: 'Bus ID', value: selectedBus.number },
                { label: 'From', value: from }, 
                { label: 'To', value: to },
                { label: 'Date', value: date },
                { label: 'Bus Type', value: selectedBus.type },
                { label: 'Selected Seats', value: selectedSeats.join(', ') || 'None' }, 
                { label: 'Total Price', value: `₹${totalPrice}` }].map(({ label, value }) => (
                <div className="summary-item" key={label}>
                  <label htmlFor={label}>{label}:</label>
                  <input type="text" id={label} value={value} readOnly />
                </div>
              ))}
              <div className="btn-container d-flex justify-content-between mt-5">
                <button className="pay-button btn btn-primary" onClick={handlePayment}>
                  Proceed Booking
                </button>
              </div>
            </div>

            <div className="bus" style={{ flexGrow: '1', marginTop: '50px' }}>
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
                      <img
                        key={seatNumber}
                        src={seat}
                        alt={`Seat ${seatNumber}`}
                        className={`seat ${selectedSeats.includes(seatNumber) ? 'selected' : ''}`}
                        onClick={(e) => toggleSeatSelection(seatNumber, e)}
                        style={{
                          width: '40px',
                          height: '40px',
                          margin: '3px',
                          cursor: bookedSeats.includes(seatNumber) ? 'not-allowed' : 'pointer',
                          border: selectedSeats.includes(seatNumber)
                            ? '2px solid green'
                            : bookedSeats.includes(seatNumber)
                            ? '2px solid red'
                            : '2px solid transparent',
                        }}
                      />
                    )
                  )}
                </div>
              ))}

              <div className="seat-legend" style={{ marginTop: '20px' }}>
                <strong>SEAT LEGEND</strong>
                <div className="d-flex justify-content-start mt-2">
                  <div className="legend-item d-flex align-items-center" style={{ marginRight: '20px' }}>
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid green',
                        marginRight: '8px',
                      }}
                    ></div>
                    <h5 className="text-secondary" style={{ margin: '0' }}>Available</h5>
                  </div>
                  <div className="legend-item d-flex align-items-center" style={{ marginRight: '20px' }}>
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid grey',
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
                        border: '2px solid crimson',
                        marginRight: '8px',
                      }}
                    ></div>
                    <h5 className="text-secondary" style={{ margin: '0' }}>Female</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BusCard;
