import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import { useSigninMutation } from '../../redux/services/SignupApi';
import { getLoginValidationSchema } from '../../utils/schema/LoginValidationSchema';
import CommonForm from './CommonForm';
import { LoginFormFields } from '../../constants/Index';
import { SigninResponse } from '../../utils/entity/loginInterface';
import Button from '../../components/Button';
import { colors } from '../../constants/Palette';
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

  const onSubmit = async (data: Record<string, string>) => {
    try {
      const { data: responseData } = (await signin(data)) as { data: SigninResponse };

      if (responseData?.statusCode === 200) {
        toast.success(responseData.message || 'Login successful!', { autoClose: 1000 });
        navigate('/home');
        reset();
      } else {
        toast.error(responseData.message || 'Login failed. Please try again.', { autoClose: 1000 });
      }
    } catch (error) {
      toast.error((error as Error).message || 'An error occurred during submission. Please try again.', { autoClose: 500 });
    }
  };

  return (
    <CommonBackground>
      <ToastContainer />
      <CommonForm
        title="Sign In"
        fields={LoginFormFields}
        errors={errors}
        register={register}
        onSubmit={handleSubmit(onSubmit)}
        submitButtonText="Sign In"
        forgotPasswordButton={
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
        }
        signUpLink={
          <p className="text-center mt-3">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        }
      />

    </CommonBackground>
  );
};

export default SignIn;
