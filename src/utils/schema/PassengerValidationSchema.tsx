import * as Yup from 'yup';


export const getPassengerDetailsValidationSchema = Yup.object().shape({
  passengers: Yup.array().of(
    Yup.object().shape({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      age: Yup.number()
        .required("Age is required")
        .min(1, "Invalid age")
        .max(120, "Invalid age"),
      gender: Yup.string().required("Gender is required"),
    })
  ),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
});