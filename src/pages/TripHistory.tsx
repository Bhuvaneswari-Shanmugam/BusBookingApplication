import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRetrievePastBookingQuery, useRetrieveUpcomingBookingQuery, useDeleteBookingMutation } from "../redux/services/BookingApi";
import Button from "../components/Button";
import Card from "../components/Card";

const TripHistory: React.FC = () => {
    const navigate = useNavigate();
    const { data: pastTrips, error: pastError, isLoading: pastLoading, refetch: refetchPast } = useRetrievePastBookingQuery();
    const { data: upcomingTrips, error: upcomingError, isLoading: upcomingLoading, refetch: refetchUpcoming } = useRetrieveUpcomingBookingQuery();
    const [deleteBooking] = useDeleteBookingMutation();
    const [activeTab, setActiveTab] = useState<'booked' | 'upcoming'>('booked');
    const [trips, setTrips] = useState<any[]>([]);
    const [apiMessage, setApiMessage] = useState<string | null>(null);

    useEffect(() => {
        if (activeTab === "booked" && pastTrips?.data) {
            setTrips(pastTrips.data);
            setApiMessage(null); // Reset the API message when data is loaded
        } else if (activeTab === "upcoming" && upcomingTrips?.data) {
            setTrips(upcomingTrips.data);
            setApiMessage(null); // Reset the API message when data is loaded
        } else {
            setTrips([]);
            if (activeTab === "booked" && pastTrips?.message) {
                setApiMessage(pastTrips.message);
            } else if (activeTab === "upcoming" && upcomingTrips?.message) {
                setApiMessage(upcomingTrips.message);
            }
        }
    }, [activeTab, pastTrips, upcomingTrips]);

    const isLoading = activeTab === "booked" ? pastLoading : upcomingLoading;
    const hasError = activeTab === "booked" ? pastError : upcomingError;

    const handleBack = () => {
        navigate('/home');
    };

    return (
        <div className="d-flex flex-column" style={{ height: '100vh', marginTop: '30px' }}>
            <div className="text-center mt-4">
                <div className="d-flex flex-column top-0 align-items-center" style={{ height: '100%', overflowY: 'auto' }}>
                    <h4>Trip History</h4>
                    <div className="d-flex align-items-center my-4 w-100">
                        <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} style={{ cursor: 'pointer', marginRight: '10px' }} />
                        <div className="flex-grow-1 d-flex justify-content-center">
                            <div className="btn-group" role="group" style={{ maxWidth: '400px' }}>
                                <Button
                                    className={`btn ${activeTab === "booked" ? "btn-primary" : "btn-secondary"}`}
                                    onClick={() => {
                                        setActiveTab("booked");
                                        refetchPast();
                                    }}
                                >
                                    Booked Trips
                                </Button>
                                <Button
                                    className={`btn ${activeTab === "upcoming" ? "btn-primary" : "btn-secondary"}`}
                                    onClick={() => {
                                        setActiveTab("upcoming");
                                        refetchUpcoming();
                                    }}
                                >
                                    Upcoming Trips
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column align-items-center" style={{ width: "750px" }}>
                        {isLoading ? (
                            <Card description={<p>Loading trips...</p>} className="w-100" />
                        ) : hasError ? (
                            <Card description={<p>Error loading trips!</p>} className="w-100" />
                        ) : trips.length > 0 ? (
                            trips.map((trip, index) => (
                                <Card
                                    key={index}
                                    header={activeTab === "upcoming" && <strong>Booking ID: {trip.bookingId}</strong>}
                                    description={
                                        <div className="container">
                                            <div className="row">
                                                <div className="col"><strong>Pickup Point</strong></div>
                                                <div className="col"><strong>Destination</strong></div>
                                                <div className="col"><strong>Trip Date</strong></div>
                                                <div className="col"><strong>Bus Number</strong></div>
                                                <div className="col"><strong>Seat Number</strong></div>
                                            </div>
                                            <div className="row">
                                                <div className="col">{trip.pickupPoint || "N/A"}</div>
                                                <div className="col">{trip.reachingPoint || "N/A"}</div>
                                                <div className="col">{trip.tripDate ? new Date(trip.tripDate).toLocaleDateString() : "N/A"}</div>
                                                <div className="col">{trip.busNumber || "N/A"}</div>
                                                <div className="col">{trip.seatNumber || "N/A"}</div>
                                            </div>
                                        </div>
                                    }
                                    className="w-100"
                                />
                            ))
                        ) : (
                            <Card description={<p>{apiMessage || (activeTab === "upcoming" ? "No upcoming bookings." : "No trips found.")}</p>} className="w-100" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripHistory;
