import * as Yup from 'yup';


export const getPassengerDetailsValidationSchema = Yup.object().shape({
  passengers: Yup.array().of(
    Yup.object().shape({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      age: Yup.number()
        .required("Age is required")
        .positive("Age must be a positive number")
        .integer("Age must be an integer")
        .min(1, "Age must be at least 1")
        .max(120, "Age must be less than or equal to 120")
        .typeError("Age must be a number"),
      gender: Yup.string().required("Gender is required"),
    })
  ),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email")
    .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
      'Invalid email format'),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be 10 digits"),
});