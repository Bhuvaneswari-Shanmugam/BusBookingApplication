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
import DeletionConfirmation from '../../components/ConfirmDelete';
import Pagination from '../../components/Pagination';
import { busFormFields } from '../../constants/adminConstants';
import { BusValidationSchema } from '../../utils/schema/AdminValidationSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PointsTable from './PointsTable';

const BusDetails = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const { data: busDetails = [], error: fetchError, isFetching, refetch } = useGetAllBusDetailsQuery({ page: currentPage, size: pageSize });
  const [createBus] = useCreateBusMutation();
  const [updateBus] = useUpdateBusMutation();
  const [deleteBus] = useDeleteBusMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState<number>(0);
  const [busToDelete, setBusToDelete] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState('display');
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({
    resolver: yupResolver(BusValidationSchema)
  });

  const [formData, setFormData] = useState({
    id: '',
    number: '',
    tripNumber: '',
    busType: '',
    capacity: '',
    name: '',
    departureTime: '',
    pickupPoint: '',
    duration: '',
    arrivalTime: '',
    droppingPoints: '',
    expense: '',
    ratings: '',
    busCategory: '',
    busRegistrationNumber: '',
    busPickupPoints: [],
    busDestinationPoints: [{}]
  });

  const [boardingPoints, setBoardingPoints] = useState([{ location: '', time: '' }]);
  const [droppingPoints, setDroppingPoints] = useState([{ location: '', time: '' }]);

  const [isProcessing, setIsProcessing] = useState(false);
  const totalPages = Math.ceil((busDetails.total || 0) / pageSize);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected);
    setCurrentPage(selectedItem.selected);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePointsChange = (index: number, field: string, value: string, setPoints: React.Dispatch<React.SetStateAction<{ location: string; time: string }[]>>) => {
    setPoints((prevPoints) => {
      const newPoints = [...prevPoints];
      newPoints[index][field] = value;
      return newPoints;
    });
  };

  const handleAddPoint = (setPoints: React.Dispatch<React.SetStateAction<{ location: string; time: string }[]>>) => {
    setPoints((prevPoints) => [...prevPoints, { location: '', time: '' }]);
  };

  const handleRemovePoint = (index: number, setPoints: React.Dispatch<React.SetStateAction<{ location: string; time: string }[]>>) => {
    setPoints((prevPoints) => {
      const newPoints = [...prevPoints];
      newPoints.splice(index, 1);
      return newPoints;
    });
  };

  const handleCreateBus = async (data: any) => {
    setIsProcessing(true);
    try {
      const busData = {
        ...data,
        busPickupPoints: boardingPoints,
        busDestinationPoints: droppingPoints
      };
      await createBus(busData).unwrap();
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

  const handleUpdateBus = async (data: any) => {
    setIsProcessing(true);
    try {
      const busData = {
        ...data,
        busPickupPoints: boardingPoints,
        busDestinationPoints: droppingPoints
      };
      await updateBus({ id: formData.id, ...busData }).unwrap();
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
      busType: bus.busType,
      capacity: bus.capacity,
      name: bus.name,
      departureTime: bus.departureTime,
      pickupPoint: bus.pickupPoint,
      duration: bus.duration,
      arrivalTime: bus.arrivalTime,
      droppingPoints: bus.droppingPoints,
      expense: bus.expense,
      ratings: bus.ratings,
      busCategory: bus.busCategory,
      busRegistrationNumber: bus.busRegistrationNumber,
      busPickupPoints: bus.busPickupPoints || [],
      busDestinationPoints: bus.busDestinationPoints || []
    });
    setBoardingPoints(bus.busPickupPoints || []);
    setDroppingPoints(bus.busDestinationPoints || []);
    setSelectedOption('update');
  };

  const handleDelete = (bus: { id: string }) => {
    setBusToDelete(bus.id);
    setIsOpen(true);
  };

  const confirmDelete = async () => {
    if (busToDelete) {
      try {
        await deleteBus({ id: busToDelete }).unwrap();
        toast.success('Bus deleted successfully!');
        refetch();
      } catch (error) {
        toast.error('Failed to delete bus. Please try again.');
      } finally {
        setIsOpen(false);
        setBusToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setIsOpen(false);
    setBusToDelete(null);
  };

  const resetForm = () => {
    setFormData({
      id: '',
      number: '',
      tripNumber: '',
      busType: '',
      capacity: '',
      name: '',
      departureTime: '',
      pickupPoint: '',
      duration: '',
      arrivalTime: '',
      droppingPoints: '',
      expense: '',
      ratings: '',
      busCategory: '',
      busRegistrationNumber: '',
      busPickupPoints: [],
      busDestinationPoints: []
    });
    setBoardingPoints([{ location: '', time: '' }]);
    setDroppingPoints([{ location: '', time: '' }]);
    reset();
  };

  const renderContent = () => {
    if (selectedOption === 'create' || selectedOption === 'update') {
      const isUpdatingMode = selectedOption === 'update';
      return (
        <div className="card mt-3">
          <Form className='' onSubmit={handleSubmit(isUpdatingMode ? handleUpdateBus : handleCreateBus)}>
            <div className="row mt-5">
              <div className="col-md-6">
                {busFormFields.slice(0, 6).map((field) => (
                  <div className="mb-3" key={field.name}>
                    <div className="d-flex align-items-center">
                      <div className="col-md-4 text-md-end pe-2">
                        <Label htmlFor={field.name} className="form-label">{field.label}</Label>
                      </div>
                      <div className="col-md-8">
                        <Input
                          {...register(field.name)}
                          type={field.type}
                          className="form-control"
                          id={field.name}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleInputChange}
                          placeholder={`Enter ${field.label}`}
                        />
                      </div>
                    </div>
                    {errors[field.name] && (
                      <span className="error text-danger mt-2">{errors[field.name]?.message}</span>
                    )}
                  </div>
                ))}
                <div className="d-flex align-items-center">
                  <Label htmlFor='Boarding Point' className="text-start me-5">Boarding Point</Label>
                  <div className="col-md-8" style={{ marginLeft: '30px' }}>
                    <PointsTable
                      points={boardingPoints}
                      onAddPoint={() => handleAddPoint(setBoardingPoints)}
                      onRemovePoint={(index) => handleRemovePoint(index, setBoardingPoints)}
                      onChange={(index, field, value) => handlePointsChange(index, field, value, setBoardingPoints)}
                      title="Boarding Points"
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                {busFormFields.slice(6).map((field) => (
                  <div className="mb-3" key={field.name}>
                    <div className="d-flex align-items-center">
                      <div className="col-md-4 text-start pe-2">
                        <Label htmlFor={field.name} className="form-label text-start">{field.label}</Label>
                      </div>
                      <div className="col-md-8">
                        <Input
                          {...register(field.name)}
                          type={field.type}
                          className="form-control"
                          id={field.name}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleInputChange}
                          placeholder={`Enter ${field.label}`}
                        />
                      </div>
                    </div>
                    {errors[field.name] && (
                      <span className="error text-danger mt-2">{errors[field.name]?.message}</span>
                    )}
                  </div>
                ))}
                <div className="d-flex align-items-center">
                  <Label htmlFor='Dropping Point' className='me-5'>Dropping Point</Label>
                  <div className="col-md-8" style={{ marginLeft: '30px' }}>
                    <PointsTable
                      points={droppingPoints}
                      onAddPoint={() => handleAddPoint(setDroppingPoints)}
                      onRemovePoint={(index) => handleRemovePoint(index, setDroppingPoints)}
                      onChange={(index, field, value) => handlePointsChange(index, field, value, setDroppingPoints)}
                      title="Dropping Points"
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center mt-4">
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
        <div className="card mt-5">
          <div>
            <div className="d-flex justify-content-end align-items-center">
              <Button className="btn border-0" onClick={() => setSelectedOption('create')} style={{ backgroundColor: colors.pagecolor }}>
                Create New Bus
              </Button>
            </div>
          </div>
          <div className="table-responsive my-4 w-100" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <table className="table table-hover table-bordered">
              <thead className="bg-primary text-white">
                <tr>
                  <th>S.No</th>
                  <th>Bus Number</th>
                  <th>Name</th>
                  <th>Trip Number</th>
                  <th>Type</th>
                  <th>Capacity</th>
                  <th>Pickup Point</th>
                  <th>Destination Point</th>
                  <th>Bus Category</th>
                  <th>Registration Number</th>
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
                    <td>{bus.busType}</td>
                    <td>{bus.capacity}</td>
                    <td>{bus.pickupPoint}</td>
                    <td>{bus.droppingPoints}</td>
                    <td>{bus.busCategory}</td>
                    <td>{bus.busRegistrationNumber}</td>
                    <td>
                      <FaEdit onClick={() => handleEdit(bus)} style={{ color: colors.pagecolor, cursor: 'pointer' }} />
                      <FaTrash onClick={() => handleDelete(bus)} style={{ color: colors.danger, cursor: 'pointer', marginLeft: '10px' }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination pageCount={totalPages} onPageChange={handlePageChange} initialPage={page} />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="container py-5">
      {renderContent()}
      {isOpen && (
        <DeletionConfirmation onConfirm={confirmDelete} onCancel={cancelDelete} />
      )}
      <ToastContainer />
    </div>
  );
};

export default BusDetails;
