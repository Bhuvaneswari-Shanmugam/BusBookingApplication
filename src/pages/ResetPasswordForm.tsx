import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Form from "../components/Form";
import { colors } from "../constants/Palette";

interface ResetPasswordFormProps {
  onSubmit: (data: { resetPassword: string; confirmPassword: string }) => void;
  isLoading: boolean;
  errors: any;
  register: any;
  handleSubmit: any;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSubmit,
  isLoading,
  errors,
  register,
  handleSubmit,
}) => {
  return (
    <div className="p-3">
      <h3 className="text-center">Reset Password</h3>
      <Form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center">
        <Input
          type="password"
          {...register("resetPassword")}
          placeholder="Enter new password"
          className="form-control my-2 w-100"
        />
        {errors.resetPassword && (
          <div className="error text-danger float-left">{errors.resetPassword.message}</div>
        )}
        <Input
          type="password"
          {...register("confirmPassword")}
          placeholder="Confirm new password"
          className="form-control my-2 w-100"
        />
        {errors.confirmPassword && (
          <div className="error text-danger float-left">{errors.confirmPassword.message}</div>
        )}
        <Button
          type="submit"
          className="btn btn-primary my-2 w-100"
          disabled={isLoading}
          style={{ backgroundColor: colors.pagecolor }}
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </Button>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
