import React from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Form from "../components/Form";
import { colors } from "../constants/Palette";

interface LoginFormProps {
  onSubmit: (data: Record<string, string>) => void;
  isLoading: boolean;
  errors: any;
  register: any;
  handleSubmit: any;
  setForgotPasswordMode: (mode: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading,
  errors,
  register,
  handleSubmit,
  setForgotPasswordMode,
}) => {
  return (
    <div className="" style={{ border: "none", boxShadow: "none" }}>
      <Form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center">
        <div className="mb-3 w-100">
          <Input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="form-control"
          />
          <div className="float-start">
            <span className="error text-danger">{errors.email?.message}</span>
          </div>
        </div>
        <div className="mb-3 w-100">
          <Input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="form-control"
          />
          <div className="float-start">
            <span className="error text-danger">{errors.password?.message}</span>
          </div>
        </div>

        <div className="text-end w-100">
          <Button
            type="button"
            className="btn btn-link p-0"
            onClick={() => setForgotPasswordMode(true)}
            style={{ textDecoration: "none", color: colors.pagecolor, backgroundColor: 'transparent' }}
          >
            Forgot Password?
          </Button>
        </div>
        <div className="justify-content-center mt-3 w-100">
          <Button type="submit" className="btn w-100" disabled={isLoading} style={{
            backgroundColor: colors.pagecolor, borderColor: colors.pagecolor
          }}>
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </div>
      </Form>

      <p className="text-center mt-3">
        Don't have an account? <Link to="/signup" style={{ color: colors.pagecolor, border: 'none' }}>Sign Up</Link>
      </p>
    </div>
  );
};

export default LoginForm;
