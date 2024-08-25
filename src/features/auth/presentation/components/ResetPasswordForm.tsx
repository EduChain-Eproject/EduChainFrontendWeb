import React, { useEffect } from 'react';
import { ResetPasswordReq } from '../../domain/usecases/ResetPassword';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../common/context/store';
import { useNavigate } from 'react-router-dom';
import { resetPasswordPageAction } from '../redux/AuthAction';

interface ResetPasswordFormProps {
  initialData?: ResetPasswordReq;
  onSubmit: (data: any) => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  initialData,
  onSubmit,
}) => {
  const { register, handleSubmit, reset } = useForm<ResetPasswordReq>({
    defaultValues: initialData || {},
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, status, error, errors } = useAppSelector(
    (s) => s.auth.resetPasswordPage,
  );
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);
  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(resetPasswordPageAction());
      alert('success reset password');
      navigate('/Auth/login');
    }
  }, [status]);

  return (
    // <div className="max-w-md mx-auto mt-10 p-6 border rounded">
    //   <h2 className="text-2xl font-bold mb-4">Reset password</h2>
    //   <form id="resetPasswordForm" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    //     <div className="form-group">
    //       <label htmlFor="email" className="block text-gray-700">Email</label>
    //       <input
    //         type="email"
    //         id="email"
    //         className="w-full px-4 py-2 border rounded"
    //         {...register('email')}
    //       />
    //          {errors?.email && (
    //           <p className="text-red-500 text-xs italic mt-1">{errors?.email}</p>
    //         )}
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="verificationCode" className="block text-gray-700">verify code</label>
    //       <input
    //         type="text"
    //         id="code"
    //         className="w-full px-4 py-2 border rounded"
    //         {...register('code')}
    //       />
    //          {errors?.code && (
    //           <p className="text-red-500 text-xs italic mt-1">{errors?.code}</p>
    //         )}
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="newPassword" className="block text-gray-700">new password</label>
    //       <input
    //         type="password"
    //         id="newPassword"
    //         className="w-full px-4 py-2 border rounded"
    //         {...register('password')}
    //       />
    //            {errors?.password && (
    //           <p className="text-red-500 text-xs italic mt-1">{errors?.password}</p>
    //         )}
    //     </div>
    //     <button
    //       type="submit"
    //       className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
    //     >
    //      send
    //     </button>
    //     <div className="error" id="error"></div>

    //   </form>
    //   {errors?.message && (
    //           <p className="text-red-500 text-xs italic mt-1">{errors?.message}</p>
    //         )}
    // </div>
    <div className="bg-yellow-400 h-screen overflow-hidden flex items-center justify-center">
      <div className="bg-black lg:w-5/12 md:6/12 w-10/12 shadow-3xl">
        <div className="bg-gray-800 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8"></div>
        <form
          className="p-12 md:p-24"
          id="resetPasswordForm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="relative flex flex-col text-lg mb-6 md:mb-8">
            <div className="relative flex items-center">
            <svg className="absolute w-6 h-6 left-3" width="24" viewBox="0 0 24 24">
              <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
            </svg>
            <input
              {...register('email')}
              type="email"
              id="email"
              className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full"
              placeholder="Email..."
            />
     
            </div>
            {errors?.email && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors?.email}
              </p>
            )}
          </div>
          <div className="relative flex flex-col text-lg mb-6 md:mb-8">
            <div className="relative flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="absolute w-6 h-6 left-3"
              >
                <path
                  d="M4 14L9 19L20 8M6 8.88889L9.07692 12L16 5"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <input
                {...register('code')}
                type="number"
                id="code"
                className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full"
                placeholder="Verify Code ..."
              />
            </div>
            {errors?.code && (
              <p className="text-red-500 text-xs italic mt-1">{errors?.code}</p>
            )}
          </div>

          <div className="relative flex flex-col text-lg mb-6 md:mb-8">
          <div className="relative flex items-center">
          <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
              <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
            </svg>
            <input
              type="password"
              id="password"
              className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full"
              placeholder="Password..."
            />
          </div>
        
            {errors?.password && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors?.password}
              </p>
            )}
          </div>
          <button
            {...register('password')}
            className="bg-gradient-to-b bg-graydark font-medium p-2 md:p-4 text-white uppercase w-full hover:text-yellow-500"
          >
            Change
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
