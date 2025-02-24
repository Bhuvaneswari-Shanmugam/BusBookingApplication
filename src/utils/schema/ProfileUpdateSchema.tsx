import * as Yup from 'yup';
const ProfileUpdateschema = Yup.object().shape({
    firstName: Yup.string().optional(),
    lastName: Yup.string().optional(),
    email: Yup.string().email("Invalid email").optional(),
    age: Yup.number()
        .required("Age is required")
        .typeError("Age must be a number")
        .positive("Age must be a positive number")
        .integer("Age must be an integer"),
    gender: Yup.string().oneOf(["male", "female", "other"], "Select a valid gender").required("Gender is required"),
    phoneNumber: Yup.string()
        .required("Phone number is required")
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    address: Yup.string().required("Address is required"),
});
export default ProfileUpdateschema;