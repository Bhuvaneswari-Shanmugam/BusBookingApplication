import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { useSignupMutation } from '../redux/services/SignupApi';
import { getSignupValidationSchema } from '../utils/schema/SignupValidationSchema';
import { SignupFormFields } from '../constants/Index';
import { SignupFormInputs, SignupErrorResponse } from '../utils/entity/SignupInterface';
import { colors } from '../constants/Palette';
import { CommonBackground } from '../assets/bgcommonprops/commonBgProps';
import CommonForm from './auth/CommonForm';

const Signup: React.FC = () => {
    const validationSchema = getSignupValidationSchema();
    const navigate = useNavigate();
    const [signup, { isLoading }] = useSignupMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SignupFormInputs>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data: SignupFormInputs) => {
        try {
            const response = await signup(data).unwrap();
            toast.success(response?.data?.message || 'Signup completed successfully!', {
                autoClose: 500,
                onClose: () => navigate('/'),
            });
            reset();
        } catch (err) {
            const errorMessage =
                (err as SignupErrorResponse)?.data?.message || 'Signup failed. Please try again.';
            toast.error(errorMessage, { autoClose: 500 });
        }
    };

    return (
        <CommonBackground>
            <ToastContainer />
                <CommonForm
                    title="Sign Up"
                    fields={SignupFormFields}
                    errors={errors}
                    register={register}
                    onSubmit={handleSubmit(onSubmit)}
                    isLoading={isLoading}
                    submitButtonText="Sign Up"
                    signUpLink={
                        <p className="text-center mt-3">
                            Already have an account? <Link to="/">Sign In</Link>
                        </p>
                    }
                />
            
        </CommonBackground>
    );
};

export default Signup;
