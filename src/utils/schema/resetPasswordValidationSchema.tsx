import * as yup from 'yup';

export const getResetPasswordValidationSchema = () => {
    return yup.object().shape({
        
        resetPassword: yup
            .string()
            .required('Password is required') 
            .min(6, 'Password must be at least 6 characters long') ,   
        confirmPassword: yup
            .string()
            .required('Password is required') 
            .min(6, 'Password must be at least 6 characters long') ,  
    });
};
