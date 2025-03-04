import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getForgotPasswordValidationSchema } from "../utils/schema/ForgotPasswordValidationSchema";
import Input from "../components/Input";
import Button from "../components/Button";
import { colors } from "../constants/Palette";

interface ForgotPasswordFormProps {
  onSubmit: (data: Record<string, string>) => void;
  isLoading: boolean;
  errors: any;
  register: any;
  handleSubmit: any;
  setForgotPasswordMode: (mode: boolean) => void;
  setEmail: (email: string) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmit,
  isLoading,
  errors,
  register,
  handleSubmit,
  setForgotPasswordMode,
  setEmail,
}) => {
  return (
    <div className="p-3" style={{ border: "none", boxShadow: "none" }}>
      <h3 className="text-center">Forgot Password</h3>
      <div className="d-flex flex-column align-items-center w-100">
        <Input
          className="form-control my-2 w-100"
          {...register("email")}
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <span className="error text-danger">{errors.email.message}</span>
        )}
        <Button
          onClick={handleSubmit(onSubmit)}
          className="btn btn-primary my-2 w-50 border-0"
          disabled={isLoading}
          style={{ backgroundColor: colors.pagecolor }}
        >
          {isLoading ? "Sending..." : "Send OTP"}
        </Button>
        <Button
          onClick={() => setForgotPasswordMode(false)}
          className="btn btn-link text-center my-2"
          style={{ textDecoration: "none", color: colors.pagecolor, backgroundColor: 'transparent' }}
        >
          Back to Sign In
        </Button>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
