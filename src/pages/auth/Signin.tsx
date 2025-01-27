import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";
import Modal from "react-bootstrap/Modal";
import { useSigninMutation, useSendOtpMutation, useValidateOtpMutation, useForgotPasswordMutation } from "../../redux/services/SignupApi";
import { getLoginValidationSchema } from "../../utils/schema/LoginValidationSchema";
import { getResetPasswordValidationSchema } from '../../utils/schema/resetPasswordValidationSchema';
import { getForgotPasswordValidationSchema } from "../../utils/schema/ForgotPasswordValidationSchema";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Form from "../../components/Form";
import { colors } from "../../constants/Palette";
import { SigninResponse } from "../../utils/entity/loginInterface";
import { LoginJwtPayload } from "../../utils/entity/loginInterface";

const SignIn: React.FC = () => {
  const validationSchema = getLoginValidationSchema();
  const navigate = useNavigate();
  const [signin, { isLoading: isSigninLoading }] = useSigninMutation();
  const [sendOtp, { isLoading: isOtpLoading }] = useSendOtpMutation();
  const [validateOtp, { isLoading: isOtpVerifying }] = useValidateOtpMutation();
  const [forgotPassword, { isLoading: isForgotPasswordLoading }] = useForgotPasswordMutation();

  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [OTP, setOTP] = useState("");
  const [email, setEmail] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPasswordData, setNewPasswordData] = useState({ newPassword: "", confirmPassword: "" });
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [resetPasswordMode, setResetPasswordMode] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { register: registerResetPassword, handleSubmit: handleSubmitResetPassword, formState: { errors: resetPasswordErrors }, reset: resetResetPassword } = useForm({
    resolver: yupResolver(getResetPasswordValidationSchema()),
  });

  const { register: registerForgotPassword, handleSubmit: handleSubmitForgotPassword, formState: { errors: forgotPasswordErrors } } = useForm({
    resolver: yupResolver(getForgotPasswordValidationSchema()),
  });

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const onSubmit = async (data: Record<string, string>) => {
    try {
      const { data: responseData } = (await signin(data)) as { data: SigninResponse };

      if (responseData?.statusCode === 200) {
        const { accessToken, refreshToken } = responseData.data;
        const decodedToken = jwtDecode<LoginJwtPayload>(accessToken);

        sessionStorage.setItem("Token", accessToken);
        sessionStorage.setItem("RefreshToken", refreshToken);
        sessionStorage.setItem("FirstName", decodedToken.FirstName || "User");
        sessionStorage.setItem("Role", decodedToken.Role?.toUpperCase() || "GUEST");

        toast.success(responseData.message || "Login successful!", { autoClose: 1000 });
        navigate(decodedToken.Role?.toUpperCase() === "ADMIN" ? "/admin" : "/passenger-details");
        reset();
      } else {
        toast.error(responseData.message || "Login failed. Please try again.", { autoClose: 1000 });
      }
    } catch (error) {
      toast.error(
        (error as Error).message || "An error occurred during submission. Please try again.",
        { autoClose: 1000 }
      );
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email address before requesting OTP.", { autoClose: 1000 });
      return;
    }
  
    try {
      const response = await sendOtp({ email }).unwrap();
      if (response.statusCode === 200) {
        toast.success(response.message || "OTP sent successfully!", { autoClose: 1000 });
        setOtpModalVisible(true);
      } else {
        toast.error(response.message || "Failed to send OTP.", { autoClose: 1000 });
      }
    } catch (error) {
      toast.error("An error occurred while sending OTP. Please try again.", { autoClose: 1000 });
    }
  };

  const handleValidateOtp = async () => {
    if (OTP.length !== 6) {
      toast.error("OTP must be exactly 6 digits. Please try again.", { autoClose: 1000 });
      return;
    }

    try {
      const response = await validateOtp({ email, OTP }).unwrap();
      if (response.statusCode === 200) {
        toast.success("OTP validated successfully. Please reset your password.", { autoClose: 1000 });
        setOtpVerified(true);
        setOtpModalVisible(false);
        setResetPasswordMode(true);
      } else {
        toast.error(response.message || "Invalid OTP. Please try again.", { autoClose: 1000 });
      }
    } catch (error) {
      toast.error("An error occurred while validating OTP. Please try again.", { autoClose: 1000 });
    }
  };

  const handleResetPassword = async (data: { resetPassword: string; confirmPassword: string }) => {
    const { resetPassword, confirmPassword } = data;

    if (resetPassword !== confirmPassword) {
      toast.error("Passwords do not match. Please try again.", { autoClose: 1000 });
      return;
    }

    try {
      const response = await forgotPassword({ email, password: resetPassword, newPassword: resetPassword, confirmPassword: confirmPassword }).unwrap();
      if (response.statusCode === 200) {
        toast.success("Password reset successful. You can now log in.", { autoClose: 1000 });
        setNewPasswordData({ newPassword: "", confirmPassword: "" });
        setOtpVerified(false);
        setForgotPasswordMode(false);
        setResetPasswordMode(false);
      } else {
        toast.error(response.message || "Failed to reset password. Please try again.", { autoClose: 1000 });
      }
    } catch (error) {
      toast.error("An error occurred while resetting the password. Please try again.", { autoClose: 1000 });
    }
  };

  return (
    <div className="container">
      {!forgotPasswordMode && !resetPasswordMode && !otpVerified && (
        <h3 className="p-4 d-flex justify-content-center">Login</h3>
      )}

      {!forgotPasswordMode && !resetPasswordMode && (
        <div className="" style={{ border: "none", boxShadow: "none" }}>
          <Form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center">
            <div className="mb-3 w-100">
              <Input
                {...register("email")}
                type="email"
                placeholder="Email"
                className="form-control"
              />
              <span className="error text-danger">{errors.email?.message}</span>
            </div>
            <div className="mb-3 w-100">
              <Input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="form-control"
              />
              <span className="error text-danger">{errors.password?.message}</span>
            </div>

            <div className="text-end w-100">
              <Button
                type="button"
                className="btn btn-link p-0"
                onClick={() => setForgotPasswordMode(true)}
                style={{ textDecoration: "none", color: colors.primary }}
              >
                Forgot Password?
              </Button>
            </div>
            <div className="justify-content-center mt-3 w-100">
              <Button type="submit" className="btn w-100" disabled={isSigninLoading}>
                {isSigninLoading ? "Signing In..." : "Sign In"}
              </Button>
            </div>
          </Form>

          <p className="text-center mt-3">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      )}

      {forgotPasswordMode && !otpVerified && (
        <div className="p-3" style={{ border: "none", boxShadow: "none" }}>
          <h3 className="text-center">Forgot Password</h3>
          <div className="d-flex flex-column align-items-center w-100">
            <Input
              className="form-control my-2 w-100"
              {...registerForgotPassword("email")}
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            {forgotPasswordErrors.email && (
              <span className="error text-danger">{forgotPasswordErrors.email.message}</span>
            )}
            <Button
              onClick={handleForgotPassword}
              className="btn btn-primary my-2 w-100"
              disabled={isOtpLoading}
            >
              {isOtpLoading ? "Sending..." : "Send OTP"}
            </Button>
            <Button
              onClick={() => setForgotPasswordMode(false)}
              className="btn btn-link text-center my-2"
              style={{ textDecoration: "none", color: colors.primary }}
            >
              Back to Sign In
            </Button>
          </div>
        </div>
      )}

      <Modal show={otpModalVisible} onHide={() => setOtpModalVisible(false)} centered className="otp-modal">
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>Enter OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            placeholder="OTP"
            className="form-control my-2"
            type="text"
            maxLength={6}
            value={OTP}
            onChange={(e) => setOTP(e.target.value)}
          />
          <Button onClick={handleValidateOtp} disabled={isOtpVerifying} className="btn btn-primary w-100">
            {isOtpVerifying ? "Verifying..." : "Verify OTP"}
          </Button>
        </Modal.Body>
      </Modal>

      {resetPasswordMode && otpVerified && (
        <div className="p-3">
          <h3 className="text-center">Reset Password</h3>
          <Form onSubmit={handleSubmitResetPassword(handleResetPassword)} className="d-flex flex-column align-items-center">
            <Input
              type="password"
              {...registerResetPassword("resetPassword")}
              placeholder="Enter new password"
              className="form-control my-2 w-100"
            />
            {resetPasswordErrors.resetPassword && (
              <span className="error text-danger">{resetPasswordErrors.resetPassword.message}</span>
            )}

            <Input
              type="password"
              {...registerResetPassword("confirmPassword")}
              placeholder="Confirm new password"
              className="form-control my-2 w-100"
            />
            {resetPasswordErrors.confirmPassword && (
              <span className="error text-danger">{resetPasswordErrors.confirmPassword.message}</span>
            )}

            <Button
              type="submit"
              className="btn btn-primary my-2 w-100"
              disabled={isForgotPasswordLoading}
            >
              {isForgotPasswordLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </Form>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default SignIn;
