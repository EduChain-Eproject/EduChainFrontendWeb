import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RegisterReq } from '../../domain/usecases/Register';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../common/context/store';

interface RegisterFormProps {
  initialData?: RegisterReq;
  onSubmit: (data: any) => void;
  errorMessage?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  initialData,
  onSubmit,
  errorMessage,
}) => {
  const { status, error, data, errors } = useAppSelector(
    (state) => state.auth.signUpPage,
  );
  const { register, handleSubmit, reset } = useForm<RegisterReq>({
    defaultValues: initialData || {},
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);
  const handleNavigate = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault(); // Prevent default link behavior
    navigate('/Auth/verify');
  };
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold text-center mb-8">Register</h2>
      {errorMessage && (
        <p className="text-red-500 text-center mb-4">{errorMessage}</p>
      )}{' '}
      {/* Display error message */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            id="email"
            {...register('email')}
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors?.email && (
            <p className="text-red-500 text-xs italic">{errors?.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            First Name
          </label>
          <input
            id="firstName"
            {...register('firstName')}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors?.firstName && (
            <p className="text-red-500 text-xs italic">{errors?.firstName}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Last Name
          </label>
          <input
            id="lastName"
            {...register('lastName')}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors?.lastName && (
            <p className="text-red-500 text-xs italic">{errors?.lastName}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Phone
          </label>
          <input
            id="phone"
            {...register('phone')}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors?.phone && (
            <p className="text-red-500 text-xs italic">{errors?.phone}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Address
          </label>
          <input
            id="address"
            {...register('address')}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors?.address && (
            <p className="text-red-500 text-xs italic">{errors?.address}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            id="password"
            {...register('password')}
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors?.password && (
            <p className="text-red-500 text-xs italic">{errors?.password}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs mt-4">
        Already have an account?{' '}
        <Link to="/Auth/login" className="text-blue-500 hover:text-blue-700">
          Login here
        </Link>
      </p>
      <p className="text-center text-gray-500 text-xs mt-4">
        Verify your account?{' '}
        <a href="/Auth/verify" onClick={handleNavigate} className="text-blue-500 hover:text-blue-700">
          Verify here
        </a>
      </p>
    </div>
  );
};

export default RegisterForm;
