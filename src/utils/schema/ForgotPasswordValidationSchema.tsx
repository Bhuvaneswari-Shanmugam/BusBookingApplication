import * as yup from 'yup';

export const getForgotPasswordValidationSchema = () => {
    return yup.object().shape({
        email: yup
            .string()
            .required('Email is required')
            .email('Invalid email format')
            .matches(
                /^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                'Invalid email format'
            ), 
    });
};
