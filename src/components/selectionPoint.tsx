import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { colors } from '../constants/Palette';
import Checkbox from './CheckBox';
import { PointSelection } from '../utils/entity/PageEntity';
import TripDetailsCard from './TripDetails';
import { useLazyGetBoardingPointQuery, useLazyGetDroppingPointQuery } from '../redux/services/BusApi';

const PointSelectionCard: React.FC<PointSelection> = ({
  totalPrice,
  bus,
  currentSelectedSeats = [],
  date,
}) => {
  const [selectedBoardingPoint, setSelectedBoardingPoint] = useState<any[]>([]);
  const [selectedDroppingPoint, setSelectedDroppingPoint] = useState<any[]>([]);
  const [triggerBoardingPoint, { data: pickupPoints, error: boardingError, isLoading: boardingLoading }] = useLazyGetBoardingPointQuery();
  const [triggerDroppingPoint, { data: droppingPoints, error: droppingError, isLoading: droppingLoading }] = useLazyGetDroppingPointQuery();
  const [showTripCard, setShowTripCard] = useState(false);
  const [activeTab, setActiveTab] = useState('boarding');
  const [selectedPickupPoint, setSelectedPickupPoint]=useState("");
  const [selectedDestinationPoint, setSelectedDesinationPoint]=useState("");
  totalPrice = bus?.expense * (currentSelectedSeats?.length ?? 0);

  const handleBoardingPoint = async () => {
    if (bus?.number) {
      const response = await triggerBoardingPoint(bus.number);
      if (response?.data) {
        setSelectedBoardingPoint(response.data.data);
      }
    }
  };

  const handleDroppingPoint = async () => {
    if (bus?.number) {
      const response = await triggerDroppingPoint(bus.number);
      if (response?.data) {
        setSelectedDroppingPoint(response.data.data);
      }
    }
  };

  const handleContinue = () => {
    setShowTripCard(true);
  };

  useEffect(() => {
    handleBoardingPoint();
  }, []);

  const handleBoardingChange = (checked: boolean, point: any) => {
    console.log(checked, point);
    console.log(selectedBoardingPoint);
    console.log(selectedPickupPoint);
    
    if (checked) {
      setSelectedBoardingPoint([{ location: point.location, time: point.time }]);
      setSelectedPickupPoint(point.location);
      console.log(selectedPickupPoint);
    } else {
      setSelectedBoardingPoint([]);
    }
  };


  const handleDroppingChange = (checked: boolean, point: any) => {
    console.log(selectedDroppingPoint);
    console.log(selectedDestinationPoint);
    if (checked) {
      setSelectedDroppingPoint([{ location: point.location, time: point.time }]);
      setSelectedDesinationPoint(point.location);
    } else {
      setSelectedDroppingPoint([]);
    }
  };

  if (showTripCard) {
    return (
      <TripDetailsCard
        show={showTripCard}
        onClose={() => setShowTripCard(false)}
        bus={bus}
        currentSelectedSeats={currentSelectedSeats.map(String)}
        date={date}
        selectedPickupPoint={selectedPickupPoint}
        selectedDroppingPoint={selectedDestinationPoint}
      />
    );
  }

  return (
    <div className="card bg-light w-100" style={{ paddingRight: '10px', flexShrink: 0 }}>
      <h5>Select the Boarding & Dropping Point</h5>
      <hr style={{ borderTop: '2px dotted #000000' }} />
      <div className="mb-3" role="group" style={{ marginTop: '-10px' }}>
        <Button
          className={`btn btn-outline-primary w-50 ${activeTab === 'boarding' ? 'active' : ''}  border-0`}
          style={{ color: activeTab === 'boarding' ? 'darkorchid' : 'inherit', background: 'none' }}
          onClick={() => {
            setActiveTab('boarding');
            handleBoardingPoint();
          }}
        >BOARDING POINT</Button>
        <Button
          className={`btn btn-outline-primary w-50 mt-${activeTab === 'dropping' ? 'active' : ''}  border-0`}
          style={{ color: activeTab === 'dropping' ? 'darkorchid' : 'inherit', background: 'none' }}
          onClick={() => {
            setActiveTab('dropping');
            handleDroppingPoint();
          }}
        >
          DROPPING POINT
        </Button>
      </div>
      <hr
        style={{
          borderTop: `4px solid ${activeTab === 'boarding' ? 'darkorchid' : activeTab === 'dropping' ? 'darkorchid' : '#000000'}`,
          width: activeTab === 'boarding' ? '50%' : activeTab === 'dropping' ? '50%' : '100%',
          marginLeft: activeTab === 'boarding' ? '0' : activeTab === 'dropping' ? '50%' : '0',
          marginTop: '-10px',
        }}
      />
      <div className="tab-content">
        {activeTab === 'boarding' && (
          <div>
            {boardingLoading ? (
              <p>Loading...</p>
            ) : (
              Array.isArray(selectedBoardingPoint) &&
              selectedBoardingPoint.map((point: any, index: number) => (
                <div key={point.location} style={{ marginBottom: '10px' }}>
                  <Checkbox
                    label={
                      <span>
                        <span className="fw-bold me-4">{point.time}</span>
                        <span className="me-4">{point.location}</span>
                      </span>
                    }
                    checked={selectedBoardingPoint.some((selected) => selected.location === point.location)}
                     type="radio"
                    name="boarding-location"
                    onChange={(checked) => handleBoardingChange(checked, point)}
                  />
                </div>
              ))
            )}
          </div>
        )}
        {activeTab === 'dropping' && (
          <div>
            {droppingLoading ? (
              <p>Loading...</p>
            ) : (
              Array.isArray(selectedDroppingPoint) &&
              selectedDroppingPoint.map((point: any, index: number) => (
                <div key={point.location} style={{ marginBottom: '10px' }}>
                  <Checkbox
                    label={
                      <span>
                        <span className="fw-bold me-4">{point.time}</span>
                        <span className=" me-4">{point.location}</span>
                      </span>
                    }
                    checked={selectedDroppingPoint.some((selected) => selected.location === point.location)}
                    type="radio"
                    name="dropping-location"
                    onChange={(checked) => handleDroppingChange(checked, point)}
                    
                  />
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <div>
        <hr className='mt-3'></hr>
        <div className="d-flex justify-content-between" >
          <span >Total Amount</span>
          <span className='fw-bold'>{`₹${totalPrice}`}</span>
        </div>
        <Button
          className="pay-button btn text-white border-0 w-100 mt-3"
          style={{ backgroundColor: colors.pagecolor }}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default PointSelectionCard;



