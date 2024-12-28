import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
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
import { FormFields } from '../constants/Index';

type SignupFormInputs = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    termsAccepted: boolean;
};

const Signup: React.FC = () => {
    const validationSchema = getSignupValidationSchema();
    const navigate = useNavigate();
    const [signup] = useSignupMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SignupFormInputs>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
        console.log('Form data submitted: ', data);
        try {
            await signup(data).unwrap();
            toast.success('SignUp done Successfully', {
                autoClose: 500,
                onClose: () => navigate('/'),
            });
            reset();
        } catch (err) {
            console.error('Signup Error: ', err);
            toast.error('Signup failed. Please try again.');
        }
    };

    return (
        <div className="home-container">
            <div
                className="customer-container d-flex justify-content-center align-items-center"
                style={{ marginTop: '-50px' }}
            >
                <ToastContainer />
                <div className="card border-0 shadow-lg bg-light" style={{ margin: '0px' }}>
                    <div className="card-body flex-column justify-content-between">
                        <h2 className="text-center font-italic p-4">Customer Signup</h2>

                        <Form
                            onSubmit={handleSubmit(onSubmit)}
                            className="d-flex flex-column align-items-center w-100"
                            
                        >
                            {FormFields.map((field, index) => (
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
                                    style={{ margin: 0, padding: '0.6rem 1rem', border: 'none', }}
                                    >
                                    Sign Up
                                </Button>
                            </div>
                        </Form>

                        <p className="text-center mt-3">
                            Already have an account? <Link to="/">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
