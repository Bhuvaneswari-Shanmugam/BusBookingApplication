import React, { useState, FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCreateSeatMutation, useFetchSeatsQuery } from '../../redux/services/SeatApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { colors } from '../../constants/Palette';
import Button from '../../components/Button'

interface Seat {
  id: number;
  busNumber: string;
  seatNumber: number;
}

interface SeatsResponse {
  data: Seat[];
  total: number;
}

 const SeatManagement: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<'display' | 'create' | 'update'>('display');
  const [busNumber, setBusNumber] = useState<string>('');
  const [seatNumber, setSeatNumber] = useState<string>('');
  const [createSeat, { isLoading, isError, error }] = useCreateSeatMutation();

  const [page, setPage] = useState<number>(0);
  const size = 10;

  const { data: seats, isLoading: isLoadingSeats, isError: isErrorSeats, error: fetchError } = useFetchSeatsQuery({ page, size });

  const seatList = Array.isArray(seats?.data) ? seats.data : [];

  const handleCreateSeat = async (e: FormEvent) => {
    e.preventDefault();

    if (!busNumber || !seatNumber) {
      toast.error("Please enter both Bus Number and Seat Number.");
      return;
    }

    if (isNaN(Number(seatNumber)) || Number(seatNumber) <= 0) {
      toast.error("Please enter a valid positive number for Seat Number.");
      return;
    }

    try {
      await createSeat({ busNumber, seatNumber }).unwrap();
      setBusNumber('');
      setSeatNumber('');
      toast.success('Seat created successfully');
      setPage(0);
      setSelectedOption('display');
    } catch (err: any) {
      console.error('Failed to create seat:', err);
      toast.error(`Error: ${err?.data?.message || 'An unexpected error occurred'}`);
    }
  };

  const handleCancel = () => {
    setSelectedOption('display');
  };

  const renderContent = () => {
    if (selectedOption === 'create') {
      return (
        <div className="mt-5">
          <h2>Create Seat Arrangement</h2>
          <form onSubmit={handleCreateSeat}>
            <div className="mb-3">
              <label htmlFor="busNumber" className="form-label">Bus Number</label>
              <input
                type="text"
                className="form-control"
                id="busNumber"
                value={busNumber}
                onChange={(e) => setBusNumber(e.target.value)}
                placeholder="Enter Bus Number"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="seatNumber" className="form-label">Seat Number</label>
              <input
                type="number"
                className="form-control"
                id="seatNumber"
                value={seatNumber}
                onChange={(e) => setSeatNumber(e.target.value)}
                placeholder="Enter Seat Number"
              />
            </div>
            <Button type="submit" className="btn " style={{backgroundColor:colors.pagecolor}} disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Submit'}
            </Button>
            <button type="button" className="btn  ms-2" style={{backgroundColor:colors.pagecolor}} onClick={handleCancel}>Cancel</button>
          </form>
          {isError && (
            <div className="alert alert-danger mt-3">
              Error: { 'status' in error ? error.status : error?.message || 'Something went wrong!' }
            </div>
          )}
        </div>
      );
    }

    if (selectedOption === 'display') {
      if (isLoadingSeats) {
        return <div>Loading seat arrangements...</div>;
      }
      if (isErrorSeats) {
        return (
          <div>
            Error: { 'status' in fetchError ? fetchError.status : 'Something went wrong!' }
          </div>
        );
      }

      return (
        <div>
          <div className="d-flex justify-content-center ">
            <h2 className="text-dark font-weight-bold">Seat List</h2>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Bus Number</th>
                <th>Seat Number</th>
              </tr>
            </thead>
            <tbody>
              {seatList.map((seat: Seat, index: number) => (
                <tr key={seat.id}>
                  <td>{index + 1 + page * size}</td>
                  <td>{seat.busNumber}</td>
                  <td>{seat.seatNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-end mt-3">
            <Button
              className="btn border-0 me-4 text-white"
              onClick={() => setPage(Math.max(0, page - 1))}
              style={{backgroundColor:colors.pagecolor}}
              disabled={page === 0}
            >
              Previous
            </Button>
            <Button
              className="btn border-0 text-white"
              onClick={() => setPage(page + 1)}
              style={{backgroundColor:colors.pagecolor}}
              disabled={!seats || seats.length < size}
            >
              Next
            </Button>
          </div>
        </div>
      );
    }

    if (selectedOption === 'update') {
      return (
        <div>
          <h2>Update Seat Arrangement</h2>
        </div>
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end p-4">
        {selectedOption === 'display' && (
          <Button className="btn  me-4 text-white border-0"
          style={{backgroundColor:colors.pagecolor}}
          onClick={() => setSelectedOption('create')}>Create</Button>
        )}
      </div>
      {renderContent()}
      <ToastContainer />
    </div>
  );
};

export default SeatManagement;
