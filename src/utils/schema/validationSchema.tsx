import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  pickupPoint: Yup.string().required('Pickup point is required'),
  destinationPoint: Yup.string()
    .required('Destination point is required')
    .notOneOf([Yup.ref('pickupPoint')], 'Pickup and destination points cannot be the same'),
  pickupDate: Yup.string().nullable().required('Pickup date is required'),
});