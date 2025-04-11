import React from 'react';
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
import Label from '../../components/Label';
import { useToast } from '../../components/NewToast';
import Checkbox from '../../components/CheckBox';

const Signup: React.FC = () => {
    const validationSchema = getSignupValidationSchema();
    const navigate = useNavigate();
    const [signup, { isLoading }] = useSignupMutation();
    const { showToast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch
    } = useForm<SignupFormInputs>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data: SignupFormInputs) => {
        try {
            const response = await signup(data).unwrap();
            showToast(response?.data?.message || 'We have sent an email! Check your inbox to verify your email.', 'success');
            reset();
            // navigate('/');
        } catch (err) {
            const errorMessage =
                (err as SignupErrorResponse)?.data?.message || 'Signup failed. Please try again.';
            showToast(errorMessage, 'error');
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
                                        <Checkbox
                                            label={field.label}
                                            checked={watch(field.name as keyof SignupFormInputs) as boolean}
                                            type="checkbox"
                                            onChange={(checked) => setValue(field.name as keyof SignupFormInputs, checked)}
                                            name={field.name}
                                        />
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
        </div>
    );
};

export default Signup;
