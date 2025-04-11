import * as Yup from 'yup';

export const BusValidationSchema = Yup.object().shape({
  id: Yup.string().notRequired(),
  number: Yup.string()
    .required('Bus number is required')
    .matches(/^[A-Z0-9]+$/, 'Bus number must be alphanumeric and uppercase')
    .min(3, 'Bus number must be at least 3 characters long')
    .max(10, 'Bus number must be at most 10 characters long'),
  tripNumber: Yup.string()
    .required('Trip number is required')
    .matches(/^[A-Z0-9]+$/, 'Trip number must be alphanumeric and uppercase')
    .min(3, 'Trip number must be at least 3 characters long')
    .max(10, 'Trip number must be at most 10 characters long'),
  name: Yup.string()
    .required('Bus name is required')
    .min(3, 'Bus name must be at least 3 characters long')
    .max(50, 'Bus name must be at most 50 characters long'),
  capacity: Yup.number()
    .required('Capacity is required')
    .integer('Capacity must be an integer'),
   
  busType: Yup.string()
    .required('Bus type is required')
    .oneOf(['AC', 'Non-AC', 'Sleeper', 'Seater'], 'Invalid bus type'),
  busCategory: Yup.string()
    .required('Bus category is required'),
    
  arrivalTime: Yup.string()
    .required('Arrival time is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Arrival time must be in HH:MM format'),
  departureTime: Yup.string()
    .required('Departure time is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Departure time must be in HH:MM format'),
  pickupPoint: Yup.string()
    .required('Pickup point is required')
    .min(3, 'Pickup point must be at least 3 characters long')
    .max(100, 'Pickup point must be at most 100 characters long'),
  droppingPoints: Yup.string()
    .required('Dropping points are required')
    .min(3, 'Dropping points must be at least 3 characters long')
    .max(100, 'Dropping points must be at most 100 characters long'),
  expense: Yup.number()
    .required('Expense is required'),
    
  ratings: Yup.number()
    .required('Ratings are required'),
    
  busRegistrationNumber: Yup.string()
    .required('Bus registration number is required')
    .matches(/^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/, 'Bus registration number must be in the format XX00XX0000')
});


export const TripValidationSchema = Yup.object().shape({
  tripNumber: Yup.string()
    .required('Trip number is required')
    .matches(/^[A-Z0-9]+$/, 'Trip number must be alphanumeric and uppercase')
    .min(3, 'Trip number must be at least 3 characters long')
    .max(10, 'Trip number must be at most 10 characters long'),
  pickupPoint: Yup.string()
    .required('Pickup point is required')
    .min(3, 'Pickup point must be at least 3 characters long')
    .max(100, 'Pickup point must be at most 100 characters long'),
  destinationPoint: Yup.string()
    .required('Destination point is required')
    .min(3, 'Destination point must be at least 3 characters long')
    .max(100, 'Destination point must be at most 100 characters long'),
  pickupTime: Yup.string()
    .required('Pickup time is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Pickup time must be in HH:MM format'),
  reachingTime: Yup.string()
    .required('Reaching time is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Reaching time must be in HH:MM format'),
});
