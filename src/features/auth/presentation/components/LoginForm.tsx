import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginReq } from '../../domain/usecases/Login';
import { useAppDispatch, useAppSelector } from '../../../../common/context/store';
import { SendResetPasswordEmailReq } from '../../domain/usecases/SendResetPasswordEmail';
import { Link, useNavigate } from 'react-router-dom';
import {  resetSendEmailResetPassword } from '../redux/AuthAction';


interface LoginFormProps {
  initialData?: LoginReq;
  onSubmit: (data: any) => void;
  onSubmitReset: (data: any) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  initialData,
  onSubmit,
  onSubmitReset,
}) => {
  const { status, error, data, errors } = useAppSelector(
    (state) => state.auth.logInPage,
  );
  const { status: sendMailStatus, errors: resetErrors } = useAppSelector(
    (state) => state.auth.sendMailPage,
  );

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<LoginReq>({
    defaultValues: initialData || {},
  });
  const navigate = useNavigate();
  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
  } = useForm<SendResetPasswordEmailReq>({
    defaultValues: {},
  });
  const dispatch = useAppDispatch();
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const openForgotPasswordModal = () => {
    setShowForgotPassword(true);
  };

  const closeForgotPasswordModal = () => {
    setShowForgotPassword(false);
  };
  useEffect(() => {
    console.log(sendMailStatus);
    if(sendMailStatus === 'succeeded'){
      alert('success sending code to your email')
      dispatch(resetSendEmailResetPassword());
      navigate('/Auth/reset_action');
    }
  })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full sm:w-96 relative z-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              id="email"
              {...register('email')}
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors?.email && (
              <p className="text-red-500 text-xs italic mt-1">{errors?.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-2">
              Password
            </label>
            <input
              id="password"
              {...register('password')}
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors?.password && (
              <p className="text-red-500 text-xs italic mt-1">{errors?.password}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
            <Link to={'/Auth/register'} className="text-blue-500 hover:text-blue-700">
              Or Sign-up
            </Link>
            <button
              type="button"
              onClick={openForgotPasswordModal}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              Or Forgot Password?
            </button>
          </div>
          {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
        </form>
      </div>
  
      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-20">
          <div className="bg-white w-11/12 md:max-w-md rounded-lg shadow-lg z-30 overflow-y-auto">
            <div className="relative p-6">
              <span
                className="absolute top-2 right-2 cursor-pointer text-2xl"
                onClick={closeForgotPasswordModal}
              >
                &times;
              </span>
              <h2 className="text-lg font-semibold mb-4">Forgot Password</h2>
              <form onSubmit={handleSubmitReset(onSubmitReset)} className="space-y-4">
                <div>
                  <label
                    htmlFor="forgotEmail"
                    className="block text-sm font-semibold mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="forgotEmail"
                    {...registerReset('email')}
                    type="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {resetErrors?.message && (
                    <p className="text-red-500 text-xs italic mt-1">
                      {resetErrors?.message}
                    </p>
                  )}
                  {sendMailStatus === 'succeeded' && (
                    <p className="text-green-500 text-xs italic mt-1">
                      Please check your email.
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
  
};

export default LoginForm;
