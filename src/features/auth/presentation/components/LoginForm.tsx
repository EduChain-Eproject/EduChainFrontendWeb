import { useForm } from 'react-hook-form';
import { LoginReq } from '../../domain/usecases/Login';
import { useEffect, useState } from 'react';
import React from 'react';
import { useAppSelector } from '../../../../common/context/store';
import { SendResetPasswordEmailReq } from '../../domain/usecases/SendResetPasswordEmail';
import { Link } from 'react-router-dom';

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
    // formState: { errors },
  } = useForm<LoginReq>({
    defaultValues: initialData || {},
  });

  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    // formState: { errors: resetErrors },
  } = useForm<SendResetPasswordEmailReq>({
    defaultValues: {},
  });

  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const openForgotPasswordModal = () => {
    setShowForgotPassword(true);
  };

  const closeForgotPasswordModal = () => {
    setShowForgotPassword(false);
  };

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full sm:w-96"
      >
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-semibold mb-2">
            Email
          </label>
          <input
            id="email"
            {...register('email', { required: 'Email is required' })}
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors?.email && (
            <p className="text-red-500 text-xs italic">{errors?.email}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-semibold mb-2"
          >
            Password
          </label>
          <input
            id="password"
            {...register('password', { required: 'Password is required' })}
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors?.password && (
            <p className="text-red-500 text-xs italic">{errors?.password}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          <Link to={'/Auth/register'}>Or Sign-up</Link>
          <button
            type="button"
            onClick={openForgotPasswordModal}
            className="text-sm text-blue-500 hover:text-blue-800"
          >
            Or Forgot Password?
          </button>
        </div>
        {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
      </form>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
          <div
            className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
            onClick={closeForgotPasswordModal}
          ></div>
          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <span
                className="close absolute top-0 right-0 cursor-pointer text-2xl"
                onClick={closeForgotPasswordModal}
              >
                &times;
              </span>
              <h2 className="text-lg font-semibold mb-4">Forgot Password</h2>
              <form onSubmit={handleSubmitReset(onSubmitReset)}>
                <div className="mb-4">
                  <label
                    htmlFor="forgotEmail"
                    className="block text-sm font-semibold mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="forgotEmail"
                    {...registerReset('email', {
                      required: 'Email is required',
                    })}
                    type="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {resetErrors?.email && (
                    <p className="text-red-500 text-xs italic">
                      {resetErrors?.email}
                    </p>
                  )}
                  {sendMailStatus === 'succeeded' && (
                    <p className="text-green-500 text-xs italic">
                      Please check your email.
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
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
