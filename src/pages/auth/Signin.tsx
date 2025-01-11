import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { jwtDecode } from 'jwt-decode';
import { useSigninMutation } from '../../redux/services/SignupApi';
import { getLoginValidationSchema } from '../../utils/schema/LoginValidationSchema';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Form from '../../components/Form';
import { colors } from '../../constants/Palette';
import { SigninResponse } from '../../utils/entity/loginInterface';
import { LoginJwtPayload } from '../../utils/entity/loginInterface';
import { CommonBackground } from '../../assets/bgcommonprops/commonBgProps';

const SignIn: React.FC = () => {
  const validationSchema = getLoginValidationSchema();
  const navigate = useNavigate();
  const [signin] = useSigninMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
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

        sessionStorage.setItem('Token', accessToken);
        sessionStorage.setItem('RefreshToken', refreshToken);
        sessionStorage.setItem('FirstName', decodedToken.FirstName || 'User');
        sessionStorage.setItem('Role', decodedToken.Role?.toUpperCase() || 'GUEST');

        toast.success(responseData.message || 'Login successful!', { autoClose: 1000 });
        navigate(decodedToken.Role?.toUpperCase() === 'ADMIN' ? '/admin' : '/home');
        reset();
      } else {
        toast.error(responseData.message || 'Login failed. Please try again.', { autoClose: 1000 });
      }
    } catch (error) {
      toast.error(
        (error as Error).message || 'An error occurred during submission. Please try again.',
        { autoClose: 500 }
      );
    }
  };

  return (
    <div>
      <h2 className="text-center font-italic p-4">Login</h2>
      <Form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center">
        <div className="mb-3 w-100">
          <Input
            {...register('email')}
            type="email"
            placeholder="Email"
            className="form-control"
          />
          <span className="error text-danger">{errors.email?.message}</span>
        </div>
        <div className="mb-3 w-100">
          <Input
            {...register('password')}
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
            onClick={() => navigate('/forgot-password')}
            style={{ textDecoration: 'none', color: colors.primary }}
          >
            Forgot Password?
          </Button>
        </div>
        <div className="justify-content-center mt-3 w-100">
          <Button type="submit" className="btn w-100">
            Sign In
          </Button>
        </div>
      </Form>

      <p className="text-center mt-3">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>

      <ToastContainer />
    </div>

  );
};

export default SignIn;