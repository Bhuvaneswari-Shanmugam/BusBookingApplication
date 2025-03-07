import React, { useState } from 'react';
import Card from './Card';

const TripHistory: React.FC = () => {
 
    const trips = [
        {
            pickupPoint: "Salem",
            destinationPoint: "Bangalore",
            fromDate: '2023-10-01',
            toDate: '2023-10-10',
            bookingId: 'PAR12345'
        },
        {
            pickupPoint: "Salem",
            destinationPoint: "Bangalore",
            fromDate: '2023-11-01',
            toDate: '2023-11-15',
            bookingId: 'NYC67890'
        },
        {
            pickupPoint: "Salem",
            destinationPoint: "Bangalore",
            fromDate: '2023-12-01',
            toDate: '2023-12-20',
            bookingId: 'TYO54321'
        }
    ];

    const [activeTab, setActiveTab] = useState<'booked' | 'upcoming'>('upcoming');


    const currentDate = new Date();
    const bookedTrips = trips.filter(trip => new Date(trip.toDate) < currentDate);
    const upcomingTrips = trips.filter(trip => new Date(trip.fromDate) >= currentDate);

    return (
        <div className="mt-5">
            <h4>Trip History</h4>
            <div className="btn-group mb-3" role="group">
                <button
                    className={`btn ${activeTab === 'booked' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('booked')}
                >
                    Booked Trips
                </button>
                <button
                    className={`btn ${activeTab === 'upcoming' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('upcoming')}
                >
                    Upcoming Trips
                </button>
            </div>

            {activeTab === 'upcoming' ? (
                <div>
                    {upcomingTrips.length > 0 ? (
                        <ul className="list-group list-group-flush w-100">
                            <li className="list-group-item d-flex align-items-center">
                                <span className="w-100 d-flex justify-content-between">
                                    <strong>Booking ID</strong>
                                    <strong>From</strong>
                                    <strong>To</strong>
                                    <strong>Pickup Point</strong>
                                    <strong>Destination Point</strong>
                                </span>
                            </li>
                            {upcomingTrips.map((trip, index) => (
                                <li key={index} className="list-group-item d-flex align-items-center">
                                    <Card
                                        description={
                                            <span className="d-flex justify-content-between w-100">
                                                <span>{trip.bookingId}</span>
                                                <span>{new Date(trip.fromDate).toLocaleDateString()}</span>
                                                <span>{new Date(trip.toDate).toLocaleDateString()}</span>
                                                <span>{trip.pickupPoint}</span>
                                                <span>{trip.destinationPoint}</span>
                                            </span>
                                        }
                                        className="w-100"
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <Card description={<p>No upcoming trips found.</p>} className="w-100" />
                    )}
                </div>
            ) : (
                <div>
                    {bookedTrips.length > 0 ? (
                        <ul className="list-group list-group-flush w-100">
                            <li className="list-group-item d-flex align-items-center">
                                <span className="w-100 d-flex justify-content-between">
                                    <strong>Booking ID</strong>
                                    <strong>From</strong>
                                    <strong>To</strong>
                                    <strong>Pickup Point</strong>
                                    <strong>Destination Point</strong>
                                </span>
                            </li>
                            {bookedTrips.map((trip, index) => (
                                <li key={index} className="list-group-item d-flex align-items-center">
                                    <Card
                                        description={
                                            <span className="d-flex justify-content-between w-100">
                                                <span>{trip.bookingId}</span>
                                                <span>{new Date(trip.fromDate).toLocaleDateString()}</span>
                                                <span>{new Date(trip.toDate).toLocaleDateString()}</span>
                                                <span>{trip.pickupPoint}</span>
                                                <span>{trip.destinationPoint}</span>
                                            </span>
                                        }
                                        className="w-100"
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <Card description={<p>No booked trips found.</p>} className="w-100" />
                    )}
                </div>
            )}
        </div>
    );
};

export default TripHistory;
