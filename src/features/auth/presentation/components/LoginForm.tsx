import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginReq } from '../../domain/usecases/Login';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../common/context/store';
import { SendResetPasswordEmailReq } from '../../domain/usecases/SendResetPasswordEmail';
import { Link, useNavigate } from 'react-router-dom';
import { resetSendEmailResetPassword } from '../redux/AuthAction';

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

  const { register, handleSubmit, reset } = useForm<LoginReq>({
    defaultValues: initialData || {},
  });
  const navigate = useNavigate();
  const { register: registerReset, handleSubmit: handleSubmitReset } =
    useForm<SendResetPasswordEmailReq>({
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
    if (sendMailStatus === 'succeeded') {
      alert('success sending code to your email');
      dispatch(resetSendEmailResetPassword());
      navigate('/Auth/reset_action');
    }
  });

  return (
    <div className=" items-center justify-center bg-gray-100">
      <div className="py-16">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          {/* Background image for larger screens */}
          <div
            className="hidden lg:block lg:w-1/2 bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
            }}
          />

          <div className="w-full p-8 lg:w-1/2 flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">
              Welcome
            </h2>
            <p className="text-xl text-gray-600 text-center mb-6">
              To Our Website!
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              <div className="text-4xs text-center text-gray-500 uppercase">
                login with email
              </div>

              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="relative mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  {...register('email')}
                  type="email"
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                />
                {errors?.email && (
                  <p className="absolute text-red-500 text-xs italic mt-1 -bottom-4 left-0">
                    {errors?.email}
                  </p>
                )}
              </div>

              <div className="relative mt-4">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <div
                    onClick={openForgotPasswordModal}
                    className="text-sm text-gray-500 hover:text-blue-700 cursor-pointer"
                  >
                    Or Forgot Password?
                  </div>
                </div>
                <input
                  id="password"
                  {...register('password')}
                  type="password"
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                />
                {errors?.password && (
                  <p className="absolute text-red-500 text-xs italic mt-1 -bottom-4 left-0">
                    {errors?.password}
                  </p>
                )}
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="bg-graydark text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-900"
                >
                  Login
                </button>
              </div>
            </form>

            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <Link
                to={'/Auth/register'}
                className="text-gray-800 hover:text-blue-700"
              >
                Or Sign-up
              </Link>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
          </div>
        </div>
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
              <form
                onSubmit={handleSubmitReset(onSubmitReset)}
                className="space-y-4"
              >
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
