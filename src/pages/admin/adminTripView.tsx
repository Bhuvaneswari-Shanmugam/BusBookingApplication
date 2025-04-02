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
import Pagination from '../../components/Pagination'

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
    const [isOpen, setIsOpen]= useState(false);
    const [tripData, setTripData] = useState<TripData>({
        tripNumber: '',
        pickupPoint: '',
        destinationPoint: '',
        pickupTime: '',
        reachingTime: '',
        
    });
    const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
    const [page, setPage] = useState<number>(0);
    const size = 10;
    const [tripToDelete, setTripToDelete] = useState<string | null>(null);

    const { data, isLoading, error, refetch } = useFetchTripsQuery({ page, size });
    const trips = data?.data || [];
    const totalPages = data?.totalPages || 1;

    const [createTrip] = useCreateTripMutation();
    const [updateTrip] = useUpdateTripMutation();
    const [deleteTrip] = useDeleteTripMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTripData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!tripData.tripNumber) {
            alert('Trip Number is required.');
            return;
        }

        try {
            const formattedPickupTime = formatISO(new Date(tripData.pickupTime));
            const formattedReachingTime = formatISO(new Date(tripData.reachingTime));

            const dataToSend = {
                ...tripData,
                pickupTime: formattedPickupTime,
                reachingTime: formattedReachingTime,
              
            };

            if (selectedTripId) {
                await updateTrip({
                    id: selectedTripId,
                    ...dataToSend,
                }).unwrap();
                toast.success('Trip updated successfully!');
            } else {
                await createTrip(dataToSend).unwrap();
                toast.success('Trip created successfully!');
            }

            setTripData({
                tripNumber: '',
                pickupPoint: '',
                destinationPoint: '',
                pickupTime: '',
                reachingTime: '',
               
            });
            setSelectedTripId(null);
            setSelectedOption('display');
            refetch(); 
        } catch (err) {
            console.error(err);
            toast.error('Failed to submit trip.');
        }
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
        setTripData({
            tripNumber: trip.tripNumber,
            pickupPoint: trip.pickupPoint,
            destinationPoint: trip.destinationPoint,
            pickupTime: formatISO(new Date(trip.pickupTime)),
            reachingTime: formatISO(new Date(trip.reachingTime)),
        
        });
        setSelectedTripId(trip.id);
    };

    const handlePrevious = () => {
        if (page > 0) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    const handleNext = () => {
        if (page < totalPages - 1) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const renderContent = () => {
        if (selectedOption === 'create') {
            return (
                <div className="card" style={{ width: '50%', marginTop: '80px' }}>
                    <h2>{selectedTripId ? 'Update Trip' : 'Create Trip'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 d-flex align-items-center">
                            <Label htmlFor="tripNumber" className="form-label me-2 w-auto">Trip Number</Label>
                            <Input
                                type="text"
                                className="form-control"
                                id="tripNumber"
                                name="tripNumber"
                                placeholder="Enter Trip Number"
                                value={tripData.tripNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <Label htmlFor="pickupPoint" className="form-label me-2 w-auto">Pickup Point</Label>
                            <Input
                                type="text"
                                className="form-control"
                                id="pickupPoint"
                                name="pickupPoint"
                                placeholder="Enter Pickup Point"
                                value={tripData.pickupPoint}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <Label htmlFor="destinationPoint" className="form-label me-2 w-auto">Destination Point</Label>
                            <Input
                                type="text"
                                className="form-control"
                                id="destinationPoint"
                                name="destinationPoint"
                                placeholder="Enter Destination Point"
                                value={tripData.destinationPoint}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <Label htmlFor="pickupTime" className="form-label me-2 w-auto">Pickup Time</Label>
                            <Input
                                type="datetime-local"
                                className="form-control"
                                id="pickupTime"
                                name="pickupTime"
                                placeholder='Enter Pickup Time'
                                value={tripData.pickupTime ? tripData.pickupTime.slice(0, 16) : ''}
                                onChange={handleChange}
                                
                            />
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <Label htmlFor="reachingTime" className="form-label me-2 w-auto">Reaching Time</Label>
                            <Input
                                type="datetime-local"
                                className="form-control"
                                id="reachingTime"
                                name="reachingTime"
                                value={tripData.reachingTime ? tripData.reachingTime.slice(0, 16) : ''}
                                onChange={handleChange}
                            />
                        </div>
                       
                        <Button
                            type="button"
                            className="btn border-0 "
                            onClick={() => setSelectedOption('display')}
                            style={{ backgroundColor: colors.pagecolor }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="btn border-0 ms-2" style={{ backgroundColor: colors.pagecolor }}>
                            {selectedTripId ? 'Update' : 'Submit'}
                        </Button>
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
                                    {trips.map((trip: Trip, index: number) => (
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
                                    ))}
                                </tbody>
                            </table>

                            <div className="d-flex justify-content-end my-3" style={{ width: '80%', margin: 'auto' }}>
                                {/* <Pagination 
                                             totalPages={15} 
                                             currentPage={currentPage} 
                                             onPageChange={(page) => setCurrentPage(page)} 
                                           /> */}
                            </div>
                        </div>
                    )}
                </div>
            );
        }
    };

    return (
        <div>
            {selectedOption === 'display' && (
                <div className=" d-flex justify-content-end align-items-center p-4 mt-5">
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
