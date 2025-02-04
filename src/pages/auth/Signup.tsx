import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import Form from '../../components/Form';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useSendOtpMutation, useValidateOtpMutation, useSignupMutation } from '../../redux/services/SignupApi';
import { getSignupValidationSchema } from '../../utils/schema/SignupValidationSchema';
import { SignupFormFields } from '../../constants/index';
import { SignupFormInputs, SignupErrorResponse } from '../../utils/entity/SignupInterface';
import { colors } from '../../constants/Palette';
import Toast from '../../components/Toast';

const Signup: React.FC = () => {
    const validationSchema = getSignupValidationSchema();
    const navigate = useNavigate();
    const [signup, { isLoading }] = useSignupMutation();
    const [sendOtp] = useSendOtpMutation();
    const [validateOtp] = useValidateOtpMutation();

    const [otpModalVisible, setOtpModalVisible] = useState(false);
    const [OTP, setOTP] = useState('');
    const [isOtpValidated, setIsOtpValidated] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);

      const [toastMessage, setToastMessage] = useState<string>('');
      const [toastType, setToastType] = useState<'info' | 'success' | 'error'>('info'); 
      const [showToast, setShowToast] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm<SignupFormInputs>({
        resolver: yupResolver(validationSchema),
    });

    const email = watch('email');

    const handleValidateOtp = async () => {
        if (!OTP  || OTP.length !== 6 || isNaN(Number(OTP))) {
         //   toast.error("Please enter a 6-digit numeric OTP.");
            setToastMessage("Please enter a 6-digit numeric OTP.");
            setToastType('error');
            setShowToast(true);
            return;
        }

        try {
            await validateOtp({ email, OTP }).unwrap();
        //    toast.success("OTP validated successfully!");
            setToastMessage("Failed to reset password. Please try again.");
            setToastType('success');
            setShowToast(true);
            setIsOtpValidated(true);
            setOtpModalVisible(false);
            setIsEmailVerified(true);
        } catch (err) {
          //  toast.error("Invalid OTP. Please try again.");
            setToastMessage("Invalid OTP. Please try again.");
            setToastType('error');
            setShowToast(true);
        }
    };

    const handleSendOtp = async (data: SignupFormInputs) => {
        try {
            const response = await sendOtp(data).unwrap();
            // toast.success(response?.data?.message || '', {
            //     autoClose: 500,
            // });
            setToastMessage("Otp verified successfully");
            setToastType('success');
            setShowToast(true);
            setOtpModalVisible(true);
        } catch (err) {
          //  const errorMessage = (err as SignupErrorResponse)?.data?.message || 'Error while sending OTP';
            //toast.error(errorMessage);
            setToastMessage("Error while sending OTP");
            setToastType('error');
            setShowToast(true);
        }
    };

    const onSubmit = async (data: SignupFormInputs) => {
        if (!isOtpValidated) {
            //toast.error('Please validate OTP before signing up.');
            setToastMessage("Please validate OTP before signing up.");
            setToastType('error');
            setShowToast(true);
            return;
        }

        try {
            const response = await signup(data).unwrap();
            // toast.success(response?.data?.message || 'Signup completed successfully!', {
            //     autoClose: 500,
            //     onClose: () => navigate('/'),
            // });
            setToastMessage("Signup completed successfully!");
            setToastType('success');
            setShowToast(true);
            navigate('/')
            reset();
        } catch (err) {
            // const errorMessage =
            //     (err as SignupErrorResponse)?.data?.message || 'Signup failed. Please try again.';
            // toast.error(errorMessage, { autoClose: 500 });
            setToastMessage("Signup failed. Please try again.");
            setToastType('error');
            setShowToast(true);
        }
    };

    // handleSendOtpWithValidation ensures the form is validated before sending the OTP. It calls handleSendOtp only if the form data is valid.
    const handleSendOtpWithValidation = (data: SignupFormInputs) => {
        handleSubmit(() => handleSendOtp(data))();
    };

    return (
        <div>
            <ToastContainer />
            <h2 className="text-center font-italic p-4">Customer Signup</h2>
            <Form
                onSubmit={handleSubmit(onSubmit)}
                className="d-flex flex-column align-items-center w-100"
            >
                {SignupFormFields.map((field, index) => (
                    <div key={index} className="mb-3 w-100">
                        {field.type === "select" ? (
                            <>
                                <select
                                    {...register(field.name as keyof SignupFormInputs)}
                                    className="form-select w-100"
                                    id={field.id}
                                >
                                    <option value="" disabled selected>
                                        {field.placeholder}
                                    </option>
                                    {field.options?.map((option, optIndex) => (
                                        <option key={optIndex} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <span className="error text-danger">
                                    {errors[field.name as keyof SignupFormInputs]?.message}
                                </span>
                            </>
                        ) : !field.isCheckbox ? (
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
                {!isEmailVerified ? (
                    <Button
                        type="button"
                        className="btn btn-secondary w-100 mt-3"
                        onClick={() => handleSendOtpWithValidation(watch())}
                    >
                        Verify Email
                    </Button>
                ) : (
                    <Button
                        type="submit"
                        className="btn w-100 mt-3"
                        style={{
                            margin: 0,
                            padding: "0.6rem 1rem",
                            border: "none",
                            backgroundColor: colors.primary,
                        }}
                        disabled={isLoading}
                    >
                        Signup
                    </Button>
                )}
            </Form>

            {showToast && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    duration={3000}
                    onClose={() => setShowToast(false)}
                />
            )}
            <p className="text-center mt-3">
                Already have an account? <Link to="/">Sign In</Link>
            </p>

            <Modal
                show={otpModalVisible}
                onHide={() => setOtpModalVisible(false)}
                centered
                className="otp-modal"
            >
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title>Enter OTP</Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-4 py-3">
                    <Input
                        type="text"
                        value={OTP}
                        onChange={(e) => setOTP(e.target.value)}
                        placeholder="Enter OTP"
                        className="form-control form-control-lg rounded"
                    />
                </Modal.Body>
                <Modal.Footer className="border-0 d-flex justify-content-center">
                    <Button
                        type="button"
                        className="btn btn-primary btn-lg w-100 rounded"
                        onClick={handleValidateOtp}
                    >
                        Validate OTP
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Signup;