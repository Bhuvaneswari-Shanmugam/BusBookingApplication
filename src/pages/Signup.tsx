import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { useSignupMutation } from '../redux/services/SignupApi';
import { getSignupValidationSchema } from '../utils/schema/SignupValidationSchema';
import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';
import { SignupFormFields } from '../constants/Index';
import { SignupFormInputs, SignupErrorResponse } from '../utils/entity/SignupInterface';
import { colors } from '../constants/Palette';
import { CommonBackground } from '../assets/bgcommonprops/commonBgProps';

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
            <div
                className="card border-0 shadow-lg bg-light"
                style={{ margin: '0 auto', width: '100%', maxWidth: '400px' }}
            >
                <div className="card-body d-flex flex-column justify-content-between">
                    <h2 className="text-center font-italic p-4">Customer Signup</h2>
                    <Form
                        onSubmit={handleSubmit(onSubmit)}
                        className="d-flex flex-column align-items-center w-100"
                    >
                        {SignupFormFields.map((field, index) => (
                            <div key={index} className="mb-3 w-100">
                                {!field.isCheckbox ? (
                                    <>
                                        <Input
                                            {...register(field.name as keyof SignupFormInputs)}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            className="form-control w-100"
                                            id={field.id}
                                        />
                                        <span className="error text-danger">
                                            {errors[field.name as keyof SignupFormInputs]?.message}
                                        </span>
                                    </>
                                ) : (
                                    <div className="form-check w-100">
                                        <Input
                                            type="checkbox"
                                            {...register(field.name as keyof SignupFormInputs)}
                                            className={field.className}
                                            id={field.id}
                                        />
                                        <label className="form-check-label" htmlFor={field.id}>
                                            {field.label}
                                        </label>
                                        <span className="error text-danger">
                                            {errors[field.name as keyof SignupFormInputs]?.message}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="justify-content-center mt-3 w-100">
                            <Button
                                type="submit"
                                className="btn w-100"
                                style={{
                                    margin: 0,
                                    padding: '0.6rem 1rem',
                                    border: 'none',
                                    backgroundColor: colors.primary,
                                    color: '#fff',
                                }}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing Up...' : 'Sign Up'}
                            </Button>
                        </div>
                    </Form>
                    <p className="text-center mt-3">
                        Already have an account? <Link to="/">Sign In</Link>
                    </p>
                </div>
            </div>
        </CommonBackground>
    );
};

export default Signup;
