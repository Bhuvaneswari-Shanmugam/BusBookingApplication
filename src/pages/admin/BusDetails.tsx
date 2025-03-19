import React, { useState } from 'react';
import { useGetAllBusDetailsQuery, useCreateBusMutation, useUpdateBusMutation, useDeleteBusMutation } from '../../redux/services/BusApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Label from '../../components/Label';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { colors } from '../../constants/Palette';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Form from '../../components/Form';

const BusDetails = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const { data: busDetails = [], error: fetchError, isFetching, refetch } = useGetAllBusDetailsQuery({ page: currentPage, size: pageSize });
  const [createBus] = useCreateBusMutation();
  const [updateBus] = useUpdateBusMutation();
  const [deleteBus] = useDeleteBusMutation();
  const [selectedOption, setSelectedOption] = useState('display');
  const [formData, setFormData] = useState({
    id: '',
    number: '',
    tripNumber: '',
    type: '',
    capacity: '',
    name: '',
    departureTime: '',
    pickupPoint: '',
    duration: '',
    arrivalTime: '',
    droppingPoint: '',
    expense: '',
    ratings: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreateBus = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      await createBus(formData).unwrap();
      toast.success('Bus created successfully!');
      setSelectedOption('display');
      resetForm();
      refetch(); 
    } catch (error) {
      toast.error('Failed to create bus. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdateBus = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      await updateBus({ id: formData.id, busData: formData }).unwrap();
      toast.success('Bus updated successfully!');
      setSelectedOption('display');
      resetForm();
      refetch(); 
    } catch (error) {
      toast.error('Failed to update bus. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEdit = (bus: any) => {
    setFormData({
      id: bus.id,
      number: bus.number,
      tripNumber: bus.tripNumber,
      type: bus.type,
      capacity: bus.capacity,
      name: bus.name,
      departureTime: bus.departureTime,
      pickupPoint: bus.pickupPoint,
      duration: bus.duration,
      arrivalTime: bus.arrivalTime,
      droppingPoint: bus.droppingPoint,
      expense: bus.expense,
      ratings: bus.ratings,
    });
    setSelectedOption('update');
  };

  const handleDelete = async (bus: { id: string }) => {
    const { id } = bus;
    try {
      await deleteBus({ id }).unwrap();
      toast.success('Bus deleted successfully!');
      refetch(); 
    } catch (error) {
      toast.error('Failed to delete bus. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      number: '',
      tripNumber: '',
      type: '',
      capacity: '',
      name: '',
      departureTime: '',
      pickupPoint: '',
      duration: '',
      arrivalTime: '',
      droppingPoint: '',
      expense: '',
      ratings: '',
    });
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const renderContent = () => {
    if (selectedOption === 'create' || selectedOption === 'update') {
      const isUpdatingMode = selectedOption === 'update';
      return (
        <div>
          <h2 className='mt-7'>{isUpdatingMode ? 'Update Bus' : 'Create New Bus'}</h2>
          <Form onSubmit={isUpdatingMode ? handleUpdateBus : handleCreateBus}>
            <div className="row mt-5">
              <div className="col-md-6">
                <div className="d-flex flex-column flex-sm-row mb-3">
                  <Label htmlFor="busNumber" className="form-label me-2 label-width">Bus Number</Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="busNumber"
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    placeholder="Enter Bus Number"
                    required
                  />
                </div>

                <div className="d-flex flex-column flex-sm-row mb-3">
                  <Label htmlFor="tripNumber" className="form-label me-2 label-width ">Trip Number</Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="tripNumber"
                    name="tripNumber"
                    value={formData.tripNumber}
                    onChange={handleInputChange}
                    placeholder="Enter Trip Number"
                    required
                  />
                </div>

                <div className="d-flex flex-column flex-sm-row mb-3">
                  <Label htmlFor="type" className="form-label me-2 label-width">Bus Type</Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    placeholder="Enter Bus Type"
                    required
                  />
                </div>

                <div className="d-flex flex-column flex-sm-row mb-3">
                  <Label htmlFor="capacity" className="form-label me-2 label-width">Capacity</Label>
                  <Input
                    type="number"
                    className="form-control me-2"
                    id="capacity"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    placeholder="Enter Capacity"
                    min="1"
                    required
                  />
                </div>

                <div className="d-flex flex-column flex-sm-row mb-3">
                  <Label htmlFor="name" className="form-label me-2 label-width">Bus Name</Label>
                  <Input
                    type="text"
                    className="form-control me-2"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter Bus Name"
                    required
                  />
                </div>

                <div className="d-flex flex-column flex-sm-row mb-3">
                  <Label htmlFor="departureTime" className="form-label me-2 label-width">Departure Time</Label>
                  <Input
                    type="text"
                    className="form-control me-2"
                    id="departureTime"
                    name="departureTime"
                    placeholder="Enter  Departure Time"
                    value={formData.departureTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex flex-column flex-sm-row mb-3">
                  <Label htmlFor="pickupPoint" className="form-label me-2 label-width">Pickup Point</Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="pickupPoint"
                    name="pickupPoint"
                    value={formData.pickupPoint}
                    onChange={handleInputChange}
                    placeholder="Enter Pickup Point"
                    required
                  />
                </div>

                <div className="d-flex flex-column flex-sm-row mb-3">
                  <Label htmlFor="duration" className="form-label me-2 label-width">Duration</Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="Enter Duration"
                    required
                  />
                </div>

                <div className="d-flex flex-column flex-sm-row mb-3">
                  <Label htmlFor="arrivalTime" className="form-label me-2 label-width">Arrival Time</Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter the Arrival Time"
                    id="arrivalTime"
                    name="arrivalTime"
                    value={formData.arrivalTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="d-flex flex-column flex-sm-row mb-3">
                  <Label htmlFor="droppingPoint" className="form-label me-2 label-width">Dropping Point</Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="droppingPoint"
                    name="droppingPoint"
                    value={formData.droppingPoint}
                    onChange={handleInputChange}
                    placeholder="Enter Dropping Point"
                    required
                  />
                </div>

                <div className="d-flex flex-column flex-sm-row mb-3">
                  <Label htmlFor="expense" className="form-label me-2 label-width">Expense</Label>
                  <Input
                    type="number"
                    className="form-control"
                    id="expense"
                    name="expense"
                    value={formData.expense}
                    onChange={handleInputChange}
                    placeholder="Enter Expense"
                    min="0"
                    required
                  />
                </div>

                <div className="d-flex flex-column flex-sm-row mb-3">
                  <Label htmlFor="ratings" className="form-label me-2 label-width custom-margin border-2">Ratings</Label>
                  <Input
                    type="number"
                    className="form-control"
                    id="ratings"
                    name="ratings"
                    value={formData.ratings}
                    onChange={handleInputChange}
                    placeholder="Enter Ratings"
                    min="3"
                    max="6"
                    step="2"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center flex-column flex-sm-row">
              <Button
                type="button"
                className="btn border-0 me-2"
                style={{ backgroundColor: colors.pagecolor }}
                onClick={() => {
                  setSelectedOption('display');
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="btn me-4 border-0"
                style={{ backgroundColor: colors.pagecolor }}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : isUpdatingMode ? 'Update' : 'Create'}
              </Button>
            </div>

          </Form>
        </div>
      );
    }

    if (selectedOption === 'display') {
      if (isFetching) return <p>Loading...</p>;
      if (fetchError) return <p className="text-danger">Failed to fetch bus details.</p>;

      const busList = Array.isArray(busDetails) ? busDetails : busDetails.data || [];

      return (
        <div>
          <div>
            <div className="d-flex justify-content-end align-items-center ">
              <Button className="btn border-0" onClick={() => setSelectedOption('create')} style={{ backgroundColor: colors.pagecolor }}>
                Create New Bus
              </Button>
            </div>
          </div>
          <div className="table-responsive my-4 w-100" style={{ maxHeight: '400px', overflowY: 'auto' }} >
            <table className="table  table-hover table-bordered">
              <thead className="bg-primary text-white">
                <tr>
                  <th>S.No</th>
                  <th>Bus Number</th>
                  <th>Name</th>
                  <th>Trip Number</th>
                  <th>Type</th>
                  <th>Capacity</th>
                  <th>PickupPoint</th>
                  <th>Destination Point</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {busList.map((bus: any, index: number) => (
                  <tr key={bus.id}>
                    <td>{index + 1 + currentPage * pageSize}</td>
                    <td>{bus.number}</td>
                    <td>{bus.name}</td>
                    <td>{bus.tripNumber}</td>
                    <td>{bus.type}</td>
                    <td>{bus.capacity}</td>
                    <td>{bus.pickupPoint}</td>
                    <td>{bus.droppingPoint}</td>
                    <td>
                      <div className='d-flex justify-content-center align-item-center'>
                        <FaEdit onClick={() => handleEdit(bus)} style={{ color: colors.pagecolor, marginRight: '10px' }} />
                        <FaTrash onClick={() => handleDelete(bus)} style={{ color: colors.danger, cursor: 'pointer' }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-center align-items-center my-3" style={{ width: '100%' }}>
            <Button
              className="btn btn-primary me-4 border-0"
              onClick={handlePrevPage}
              disabled={currentPage <= 0}
              style={{ backgroundColor: colors.pagecolor }}
            >
              Previous
            </Button>
            <Button
              className="btn btn-primary border-0"
              onClick={handleNextPage}
              disabled={busList.length < pageSize}
              style={{ backgroundColor: colors.pagecolor }}
            >
              Next
            </Button>
          </div>
        </div>
      );
    }

    return <p>Please select an option to proceed.</p>;
  };

  return (
    <div className="card " style={{ width: '100%', maxWidth: '1200px', marginTop: '70px' }}>
      {renderContent()}
      <ToastContainer />
    </div>
  );
};

export default BusDetails;
