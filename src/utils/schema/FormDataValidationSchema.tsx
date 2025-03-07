import * as yup from 'yup';

export const getValidationSchema = () => {
  return yup.object().shape({
    number: yup.string().required('Bus Number is required'),
    tripNumber: yup.string().required('Trip Number is required'),
    type: yup.string().required('Bus Type is required'),
    capacity: yup.number().required('Capacity is required').min(1, 'Capacity must be at least 1'),
    name: yup.string().required('Bus Name is required'),
    expense: yup.number().required('Expense is required').min(0, 'Expense must be at least 0'),
    ratings: yup.number().required('Ratings are required').min(1, 'Ratings must be at least 1').max(5, 'Ratings must be at most 5'),
    departureTime: yup.string().required('Departure Time is required'),
    arrivalTime: yup.string().required('Arrival Time is required'),
    pickupPoint: yup.string().required('Pickup Point is required'),
    duration: yup.string().required('Duration is required'),
    droppingPoint: yup.string().required('Dropping Point is required'),
  });
};
