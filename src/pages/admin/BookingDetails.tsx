import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFetchAllBookingQuery } from '../../redux/services/BookingDetailApi';
import Pagination from '../../components/Pagination';

const AllBookingDetails = () => {
  const [page, setPage] = useState(0);
  const size = 10;

  const { data, error, isLoading, isError } = useFetchAllBookingQuery({ page, size });

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected);
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
    const totalPages = 15;

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
                <th>Booking Date</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {
                bookingList.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-3">No Bookings Found</td>
                  </tr>
                ) : (
                  bookingList.map((booking: any, index: number) => (
                    <tr key={booking.ticketId}>
                      <td>{index + 1 + page * size}</td>
                      <td>{`${booking.ticketId}`}</td>
                      <td>{booking.busNumber}</td>
                      <td>{new Date(booking.tripDate).toLocaleString()}</td>
                      <td>{booking.bookedSeat}</td>
                      <td>₹{booking.perSeatAmount || 'N/A'}</td>
                      <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                      <td>₹{booking.totalPrice || 'N/A'}</td>
                    </tr>
                  ))
                )
              }
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-end my-3 border-0" style={{ width: '85%', margin: 'auto' }}>
          <Pagination pageCount={totalPages} onPageChange={handlePageChange} initialPage={page} />
        </div>
      </div>
    );
  };

  return (
    <div>{renderContent()}</div>
  );
};

export default AllBookingDetails;
