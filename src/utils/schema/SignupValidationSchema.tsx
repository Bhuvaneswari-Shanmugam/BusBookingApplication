import * as Yup from 'yup';

export const getSignupValidationSchema = () => {
    return Yup.object().shape({
        firstName: Yup.string()
            .required("First Name is required"),
        lastName: Yup.string()
            .required("Last Name is required"),
        email: Yup.string()
            .required("Email is required")
            .email("Invalid email format")
            .matches(
                /^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                'Invalid email format'
            ),
            password: Yup.string()
            .required('Password is required')
            .min(5, 'Password must be at least 8 characters')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
        
        role: Yup.string()
             .required("Role is required")
            .oneOf(['ADMIN', 'CUSTOMER'], "role must be either Admin or Customer"),
        termAccepted: Yup.bool().oneOf([true], 'You must accept the terms and conditions').required('Terms and conditions are required'),
    
    });
};