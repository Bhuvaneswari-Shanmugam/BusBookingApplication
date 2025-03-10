import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Form from '../../components/Form';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useSignupMutation } from '../../redux/services/SignupApi';
import { getSignupValidationSchema } from '../../utils/schema/SignupValidationSchema';
import { SignupFormFields } from '../../constants/index';
import { SignupFormInputs, SignupErrorResponse } from '../../utils/entity/SignupInterface';
import { colors } from '../../constants/Palette';
import Card from '../../components/Card';
import Toast from '../../components/Toast';
import Label from '../../components/Label';

const Signup: React.FC = () => {
    const validationSchema = getSignupValidationSchema();
    const navigate = useNavigate();
    const [signup, { isLoading }] = useSignupMutation();
    const [toastMessage, setToastMessage] = useState<string>('');
    const [toastType, setToastType] = useState<'info' | 'success' | 'error'>('info');
    const [showToast, setShowToast] = useState<boolean>(false);

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
            setToastMessage(response?.data?.message || 'Weve sent an email! Check your inbox to verify your email.');
            setToastType('success');
            setShowToast(true);
            reset();
            // navigate('/');
        } catch (err) {
            const errorMessage =
                (err as SignupErrorResponse)?.data?.message || 'Signup failed. Please try again.';
            setToastMessage(errorMessage);
            setToastType('error');
            setShowToast(true);
        }
    };

    return (
        <div className="container mt-5">
            <Card
                description={
                    <Form onSubmit={handleSubmit(onSubmit)} style={{ height: '520px', width: '350px' }}>
                        <h3 className=' mb-2'>Sign up</h3>
                        {SignupFormFields.map((field, index) => (
                            <div key={index} className=" w-100 mb-4">
                                {field.type === "select" ? (
                                    <>
                                        <select
                                            {...register(field.name as keyof SignupFormInputs)}
                                            className="form-select w-100"
                                            id={field.id}
                                        >
                                            {/* <option value="" disabled selected>
                                                {field.placeholder}
                                            </option> */}
                                            {field.options?.map((option, optIndex) => (
                                                <option key={optIndex} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        <div className='float-start mb-2'>
                                            <span className="error text-danger ">
                                                {errors[field.name as keyof SignupFormInputs]?.message}
                                            </span>
                                        </div>
                                    </>
                                ) : field.isCheckbox ? (
                                    <div className="form-check w-100 ">
                                        <div className="d-flex justify-content-start align-items-center gap-0">
                                            <Input
                                                type="checkbox"
                                                {...register(field.name as keyof SignupFormInputs)}
                                                className={field.className}
                                                id={field.id}
                                                style={{ borderColor: colors.pagecolor }}
                                            />
                                            <Label className="form-check-label ms-0" htmlFor={field.id}>
                                                {field.label}
                                            </Label>
                                        </div>
                                        <div className="float-start mb-2" style={{ marginLeft: "-22px" }} >
                                            <span className="error text-danger">
                                                {errors[field.name as keyof SignupFormInputs]?.message}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <Input
                                            {...register(field.name as keyof SignupFormInputs)}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            className="form-control w-100"
                                            id={field.id}
                                        />
                                        <div className="float-start mb-2">
                                            <span className="error text-danger">
                                                {errors[field.name as keyof SignupFormInputs]?.message}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}

                        <Button
                            type="submit"
                            className="btn w-100 mt-3"
                            style={{
                                margin: 0,
                                padding: "0.6rem 1rem",
                                border: "none",
                                backgroundColor: colors.pagecolor
                            }}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing up...' : 'Signup'}
                        </Button>


                        <p className="text-center mt-3">
                            Already have an account? <Link to="/" style={{ color: colors.pagecolor }}>Sign In</Link>
                        </p>
                    </Form>
                }
            />

            {showToast && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    duration={3000}
                    onClose={() => setShowToast(false)}
                />
            )}
        </div>
    );
};

export default Signup;
