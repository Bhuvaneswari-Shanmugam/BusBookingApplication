import * as yup from 'yup';

export const getLoginValidationSchema = () => {
    return yup.object().shape({
        email: yup
            .string()
            .required('Email is required')
            .email('Invalid email format')
            .matches(
                /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                'Invalid email format'
            ),
        password: yup
            .string()
            .required('Password is required') 
            .min(6, 'Password must be at least 6 characters long') ,   
    });
};
