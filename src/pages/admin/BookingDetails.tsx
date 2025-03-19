import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFetchAllBookingQuery } from '../../redux/services/BookingDetailApi';
import { colors } from '../../constants/Palette';

const AllBookingDetails = () => {
    const [page, setPage] = useState(0); 
    const size = 10;  

    const { data, error, isLoading, isError } = useFetchAllBookingQuery({ page, size });

    const handleNextPage = () => {
        if (data && data.data.length === size) { 
            setPage((prev) => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 0) {
            setPage((prev) => prev - 1);
        }
    };

    const renderContent = () => {
        if (isLoading) {
            return <div className="text-center py-5">Loading...</div>;
        }
        if (isError) {
            return (
                <div className="text-center text-danger py-5">
                    Error loading bookings: { 'status' in error ? `Status: ${error.status}` : error.message }
                </div>
            );
        }

        const bookingList = data?.data || [];

        return (
            <div className="booking-list justify-content-center align-items-center my-4">
                <div className="booking-details text-center my-4">
                    <h4 className="text-dark font-weight-bold mt-5 text-start my-4">Booking Details</h4>
                </div>

                <div className="table-responsive" style={{ margin: 'auto', width: '85%' }}>
                    <table className="table table-hover table-bordered">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th>S.No</th>
                                <th>TicketID</th>
                                <th>Bus Number</th>
                                <th>Pickup Date & Time</th>
                                <th>Seat Number</th>
                                 <th>Per Seat Amount</th>
                                <th>Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookingList.length > 0 ? (
                                bookingList.map((booking: any, index: number) => (
                                    <tr key={booking.ticketId}>
                                        <td>{index + 1 + page * size}</td>
                                        <td>{`${booking.ticketId}` }</td>
                                        <td>{booking.busNumber}</td>
                                        <td>{new Date(booking.tripDate).toLocaleString()}</td>
                                        <td>{booking.bookedSeat}</td>
                                        <td>₹{booking.perSeatAmount || 'N/A'}</td>
                                        <td>₹{booking.totalPrice || 'N/A'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-center">
                                        No bookings found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="d-flex justify-content-end my-3 bordeer-0" style={{ width: '85%', margin: 'auto' }}>
                    <button
                        className="btn  me-4 text-white"
                        onClick={handlePrevPage}
                        disabled={page === 0}
                        style={{backgroundColor:colors.pagecolor}}
                    >
                        Previous
                    </button>
                    <button
                        className="btn border-0 text-white "
                        onClick={handleNextPage}
                        disabled={data && data.data.length < size} 
                        style={{backgroundColor:colors.pagecolor}}
                    >
                        Next
                    </button>
                </div>

            </div>
        );
    };

    return (
        <div>{renderContent()}</div>
    );
};

export default AllBookingDetails;
