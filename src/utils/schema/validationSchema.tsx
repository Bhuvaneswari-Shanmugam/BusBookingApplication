import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  pickupPoint: Yup.string().required('Pickup point is required'),
  destinationPoint: Yup.string()
    .required('Destination point is required') 
    .notOneOf([Yup.ref('pickupPoint')], 'Select different location'),
  pickupDate: Yup.string().required('Pickup date is required').nullable(),
});
