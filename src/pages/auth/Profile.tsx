import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useSendOtpMutation, useValidateOtpMutation, useSignupMutation } from "../../redux/services/SignupApi";
import { getSignupValidationSchema } from "../../utils/schema/SignupValidationSchema";
import { SignupFormFields } from "../../constants/index";
import { SignupFormInputs, SignupErrorResponse } from "../../utils/entity/SignupInterface";
import { colors } from "../../constants/Palette";
import Card from "../../components/Card";
import Toast from "../../components/Toast";

const Signup: React.FC = () => {
    const validationSchema = getSignupValidationSchema();
    const navigate = useNavigate();
    const [signup, { isLoading }] = useSignupMutation();
    const [sendOtp] = useSendOtpMutation();
    const [validateOtp] = useValidateOtpMutation();
    
    const [otpModalVisible, setOtpModalVisible] = useState(false);
    const [OTP, setOTP] = useState("");
    const [isOtpValidated, setIsOtpValidated] = useState(false);
    const [toastMessage, setToastMessage] = useState<string>("");
    const [toastType, setToastType] = useState<"info" | "success" | "error">("info");
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

    const email = watch("email");

    const handleValidateOtp = async () => {
        if (!OTP || OTP.length !== 6 || isNaN(Number(OTP))) {
            setToastMessage("Please enter a valid 6-digit OTP.");
            setToastType("error");
            setShowToast(true);
            return;
        }

        try {
            await validateOtp({ email, OTP }).unwrap();
            setToastMessage("OTP validated successfully!");
            setToastType("success");
            setShowToast(true);
            setIsOtpValidated(true);
            setOtpModalVisible(false);
        } catch (err) {
            setToastMessage("Invalid OTP. Please try again.");
            setToastType("error");
            setShowToast(true);
        }
    };

    const handleButtonClick = async (data: SignupFormInputs) => {
        if (!isOtpValidated) {
            try {
                const response = await sendOtp(data).unwrap();
                setToastMessage(response?.data?.message || "OTP sent");
                setToastType("success");
                setShowToast(true);
                setOtpModalVisible(true);
            } catch (err) {
                const errorMessage = (err as SignupErrorResponse)?.data?.message || "Error while sending OTP";
                setToastMessage(errorMessage);
                setToastType("error");
                setShowToast(true);
            }
        } else {
            try {
                const response = await signup(data).unwrap();
                setToastMessage(response?.data?.message || "Signup successful!");
                setToastType("success");
                setShowToast(true);
                navigate("/");
                reset();
            } catch (err) {
                const errorMessage = (err as SignupErrorResponse)?.data?.message || "Signup failed. Try again.";
                setToastMessage(errorMessage);
                setToastType("error");
                setShowToast(true);
            }
        }
    };

    return (
        <div className="container mt-5">
            <Card
                description={
                    <Form onSubmit={handleSubmit(handleButtonClick)}>
                        <h3>Sign up</h3>
                        {SignupFormFields.map((field, index) => (
                            <div key={index} className="mb-3 w-100">
                                {field.type === "select" ? (
                                    <>
                                        <select {...register(field.name as keyof SignupFormInputs)} className="form-select w-100">
                                            <option value="" disabled>
                                                {field.placeholder}
                                            </option>
                                            {field.options?.map((option, optIndex) => (
                                                <option key={optIndex} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="float-start">
                                            <span className="error text-danger">
                                                {errors[field.name as keyof SignupFormInputs]?.message}
                                            </span>
                                        </div>
                                    </>
                                ) : !field.isCheckbox ? (
                                    <>
                                        <Input
                                            {...register(field.name as keyof SignupFormInputs)}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            className="form-control w-100"
                                        />
                                        <div className="float-start">
                                            <span className="error text-danger">
                                                {errors[field.name as keyof SignupFormInputs]?.message}
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="form-check w-100">
                                        <Input
                                            type="checkbox"
                                            {...register(field.name as keyof SignupFormInputs)}
                                            className={field.className}
                                            style={{ borderColor: colors.pagecolor }}
                                        />
                                        <label className="form-check-label">
                                            {field.label}
                                        </label>
                                        <div>
                                            <span className="error text-danger">
                                                {errors[field.name as keyof SignupFormInputs]?.message}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        <Button
                            type="submit"
                            className="btn w-100 mt-3"
                            style={{
                                padding: "0.6rem 1rem",
                                border: "none",
                                backgroundColor: colors.pagecolor,
                            }}
                            disabled={isLoading}
                        >
                            {isOtpValidated ? "Signup" : "Verify Email & Signup"}
                        </Button>

                        <p className="text-center mt-3">
                            Already have an account? <Link to="/" style={{ color: colors.pagecolor }}>Sign In</Link>
                        </p>
                    </Form>
                }
            />

            <Modal show={otpModalVisible} onHide={() => setOtpModalVisible(false)} centered>
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

            {showToast && (
                <Toast message={toastMessage} type={toastType} duration={3000} onClose={() => setShowToast(false)} />
            )}
        </div>
    );
};

export default Signup;
