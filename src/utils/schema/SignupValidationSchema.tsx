import * as Yup from 'yup';

export const getSignupValidationSchema = () => {
    return Yup.object().shape({
        firstName: Yup.string()
            .required("First Name is required"),
        lastName: Yup.string()
            .required("Last Name is required"),
        email: Yup.string()
            .required("Email is required")
            .email("Invalid email format"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
        role: Yup.string()
             .required("Role is required")
            .oneOf(['ADMIN', 'CUSTOMER'], "role must be either Admin or Customer"),
        termsAccepted: Yup.bool().oneOf([true], 'You must accept the terms and conditions').required('Terms and conditions are required'),
    
    });
};