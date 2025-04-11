import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { formatISO } from 'date-fns';
import { useFetchTripsQuery, useCreateTripMutation, useUpdateTripMutation, useDeleteTripMutation } from '../../redux/services/TripApi';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Label from '../../components/Label';
import { colors } from '../../constants/Palette';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import DeletionConfirmation from '../../components/ConfirmDelete';
import Pagination from '../../components/Pagination';
import { tripFormFields } from '../../constants/adminConstants';
import { TripValidationSchema } from '../../utils/schema/AdminValidationSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface TripData {
  tripNumber: string;
  pickupPoint: string;
  destinationPoint: string;
  pickupTime: string;
  reachingTime: string;
}

interface Trip {
  id: string;
  tripNumber: string;
  pickupPoint: string;
  destinationPoint: string;
  pickupTime: string;
  reachingTime: string;
  expense: number;
}

const TripInfo: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<'display' | 'create'>('display');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const size = 10;
  const totalPages = 15;
  const [tripToDelete, setTripToDelete] = useState<string | null>(null);

  const { data, isLoading, error, refetch } = useFetchTripsQuery({ page, size });
  const trips = data?.data || [];

  const [createTrip] = useCreateTripMutation();
  const [updateTrip] = useUpdateTripMutation();
  const [deleteTrip] = useDeleteTripMutation();

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: yupResolver(TripValidationSchema),
  });

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected);
  };

  const onSubmit = async (data: TripData) => {
    const formattedPickupTime = formatISO(new Date(data.pickupTime));
    const formattedReachingTime = formatISO(new Date(data.reachingTime));

    const dataToSend = {
      ...data,
      pickupTime: formattedPickupTime,
      reachingTime: formattedReachingTime,
    };

    if (selectedTripId) {
      await updateTrip({ id: selectedTripId, ...dataToSend }).unwrap();
      toast.success('Trip updated successfully!');
    } else {
      await createTrip(dataToSend).unwrap();
      toast.success('Trip created successfully!');
    }

    reset();
    setSelectedTripId(null);
    setSelectedOption('display');
    refetch();
  };

  const handleDelete = async (trip: Trip) => {
    setTripToDelete(trip.id);
    setIsOpen(true);
  };

  const confirmDelete = async () => {
    if (tripToDelete) {
      try {
        await deleteTrip(tripToDelete).unwrap();
        toast.success('Trip deleted successfully!');
        setTripToDelete(null);
        refetch();
      } catch (error) {
        toast.error('Failed to delete trip. Please try again.');
      }
    }
  };

  const cancelDelete = () => {
    setTripToDelete(null);
  };

  const handleUpdate = (trip: Trip) => {
    setSelectedOption('create');
    tripFormFields.forEach((field) => {
      setValue(field.name, trip[field.name]);
    });
    setSelectedTripId(trip.id);
  };

  const renderContent = () => {
    if (selectedOption === 'create') {
      return (
        <div className="card" style={{ width: '50%', marginTop: '80px' }}>
          <h2>{selectedTripId ? 'Update Trip' : 'Create Trip'}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6">
                {tripFormFields.slice(0, 3).map((field) => (
                  <div key={field.name} className="mb-3">
                    <div className="d-flex align-items-center text-start">
                      <Label htmlFor={field.name} className="form-label me-2 w-auto">
                        {field.label}
                      </Label>
                      <Input
                        {...register(field.name)}
                        type={field.type}
                        className="form-control"
                        id={field.name}
                        name={field.name}
                        placeholder={`Enter ${field.label}`}
                      />
                    </div>
                    {errors[field.name] && (
                      <span className="error text-danger mt-2 d-block">{errors[field.name]?.message}</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="col-md-6">
                {tripFormFields.slice(3).map((field) => (
                  <div key={field.name} className="mb-3">
                    <div className="d-flex align-items-center text-start">
                      <Label htmlFor={field.name} className="form-label me-2 w-auto">
                        {field.label}
                      </Label>
                      <Input
                        {...register(field.name)}
                        type={field.type}
                        className="form-control"
                        id={field.name}
                        name={field.name}
                        placeholder={`Enter ${field.label}`}
                      />
                    </div>
                    {errors[field.name] && (
                      <span className="error text-danger mt-2 d-block">{errors[field.name]?.message}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <Button
                type="button"
                className="btn border-0 me-2"
                onClick={() => setSelectedOption('display')}
                style={{ backgroundColor: colors.pagecolor }}
              >
                Cancel
              </Button>
              <Button type="submit" className="btn border-0 ms-2" style={{ backgroundColor: colors.pagecolor }}>
                {selectedTripId ? 'Update' : 'Submit'}
              </Button>
            </div>
          </form>

        </div>
      );
    }

    if (selectedOption === 'display') {
      return (
        <div>
          {isLoading ? (
            <div className="text-center py-5">Loading...</div>
          ) : error ? (
            <div className="text-center text-danger py-5">Error loading trips</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-bordered" style={{ width: '80%', marginLeft: '10%' }}>
                <thead className="bg-primary text-white">
                  <tr>
                    <th>S.No</th>
                    <th>Trip Number</th>
                    <th>Pickup Point</th>
                    <th>Destination Point</th>
                    <th>Pickup Time</th>
                    <th>Reaching Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {trips.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-3">No trips found</td>
                    </tr>
                  ) : (
                    trips.map((trip: Trip, index: number) => (
                      <tr key={trip.id}>
                        <td>{page * size + index + 1}</td>
                        <td>{trip.tripNumber}</td>
                        <td>{trip.pickupPoint}</td>
                        <td>{trip.destinationPoint}</td>
                        <td>{trip.pickupTime}</td>
                        <td>{trip.reachingTime}</td>
                        <td>
                          <div className="d-flex justify-content-center align-item-center">
                            <FaEdit onClick={() => handleUpdate(trip)} style={{ color: colors.pagecolor, marginRight: '10px' }} />
                            <FaTrash onClick={() => handleDelete(trip)} style={{ color: colors.danger, cursor: 'pointer' }} />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              <div className="d-flex justify-content-end my-3" style={{ width: '80%', margin: 'auto' }}>
                <Pagination pageCount={totalPages} onPageChange={handlePageChange} initialPage={page} />
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="container py-5">
      {selectedOption === 'display' && (
        <div className="d-flex justify-content-end align-items-center p-4 mt-5">
          <Button onClick={() => setSelectedOption('create')} className="btn mx-4 border-0" style={{ backgroundColor: colors.pagecolor }}>
            Create Trip
          </Button>
        </div>
      )}
      {renderContent()}
      {tripToDelete && isOpen && (
        <DeletionConfirmation onConfirm={confirmDelete} onCancel={cancelDelete} />
      )}
    </div>
  );
};

export default TripInfo;
