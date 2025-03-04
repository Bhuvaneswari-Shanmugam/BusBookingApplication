import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { useRetrievePastBookingQuery, useRetrieveUpcomingBookingQuery, useDeleteBookingMutation } from "../redux/services/BookingApi";
import { tripActions } from "../constants/index";

const TripHistory: React.FC = () => {
    const navigate = useNavigate();
    const { data: pastTrips, error: pastError, isLoading: pastLoading, refetch: refetchPast } = useRetrievePastBookingQuery();
    const { data: upcomingTrips, error: upcomingError, isLoading: upcomingLoading, refetch: refetchUpcoming } = useRetrieveUpcomingBookingQuery();
    const [deleteBooking] = useDeleteBookingMutation();

    const [activeTab, setActiveTab] = useState<'booked' | 'upcoming'>('booked');
    const [trips, setTrips] = useState<any[]>([]);

    useEffect(() => {
        if (activeTab === "booked" && pastTrips?.data) {
            setTrips(pastTrips.data);
        } else if (activeTab === "upcoming" && upcomingTrips?.data) {
            setTrips(upcomingTrips.data);
        }
    }, [activeTab, pastTrips, upcomingTrips]);

    const isLoading = activeTab === "booked" ? pastLoading : upcomingLoading;
    const hasError = activeTab === "booked" ? pastError : upcomingError;

    const handleDelete = async (bookingId: string) => {
        try {
            await deleteBooking(bookingId).unwrap();
            console.log("Deleted trip with ID:", bookingId);
            if (activeTab === "upcoming") {
                refetchUpcoming();
            } else {
                refetchPast();
            }
        } catch (error) {
            console.error("Failed to delete trip:", error);
        }
    };

    return (
        <div className="text-center " style={{ marginTop: '300px' }}>
            <h4>Trip History</h4>

            <div className="d-flex justify-content-center align-items-center mb-4 p-0 ">
                <div className="btn-group" role="group" style={{ width: '400px' }}>
                    <button
                        className={`btn ${activeTab === "booked" ? "btn-primary" : "btn-secondary"}`}
                        onClick={() => {
                            setActiveTab("booked");
                            refetchPast();
                        }}
                    >
                        Booked Trips
                    </button>
                    <button
                        className={`btn ${activeTab === "upcoming" ? "btn-primary" : "btn-secondary"}`}
                        onClick={() => {
                            setActiveTab("upcoming");
                            refetchUpcoming();
                        }}
                    >
                        Upcoming Trips
                    </button>
                </div>
            </div>

            <div className="d-flex flex-column align-items-center p-0" style={{width:"750px"}}>
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
                                        {activeTab === "upcoming" && <div className="col"><strong>Actions</strong></div>}
                                    </div>
                                    <div className="row">
                                        <div className="col">{trip.pickupPoint}</div>
                                        <div className="col">{trip.reachingPoint}</div>
                                        <div className="col">{new Date(trip.tripDate).toLocaleDateString()}</div>
                                        <div className="col">{trip.busNumber}</div>
                                        <div className="col">{trip.seatNumber}</div>
                                        {activeTab === "upcoming" && (
                                            <div className="col d-flex justify-content-center">
                                                {tripActions(trip.bookingId, handleDelete).map((action, idx) => (
                                                    <span
                                                        key={idx}
                                                        onClick={() => action.handler(trip.bookingId)}
                                                        style={{ cursor: 'pointer', marginLeft: idx > 0 ? '16px' : '0' }}
                                                    >
                                                        {action.icon}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            }
                            className="w-100"
                        />
                    ))
                ) : (
                    <Card description={<p>{activeTab === "upcoming" ? "There is no booking" : "No trips found."}</p>} className="w-100" />
                )}
            </div>
        </div>
    );
};

export default TripHistory;
