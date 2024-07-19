import React, { useEffect } from 'react';
import { useAppSelector } from '../../../../common/context/store';
import { UpdateUserProfileReq } from '../../domain/usecases/UpdateUserProfileUseCase';
import { useForm, SubmitHandler } from 'react-hook-form';
import { UserProfileModel } from '../../domain/entities/UserProfileModel';

interface Props {
  initialData: UserProfileModel | undefined;
  onSubmit: (data: UpdateUserProfileReq) => void;
  serverError?: string; // Optional server error message
}

const UpdateUserProfileComp: React.FC<Props> = ({ initialData, onSubmit, serverError }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<UpdateUserProfileReq>({
    defaultValues: {
      id: initialData?.id,
    }
  });

  useEffect(() => {
    if (initialData) {
      setValue('id', initialData.id);
      setValue('email', initialData.email);
      setValue('firstName', initialData.firstName);
      setValue('lastName', initialData.lastName);
      setValue('phone', initialData.phone);
      setValue('address', initialData.address);
      setValue('avatarPath', initialData.avatarPath);
    }
  }, [initialData, setValue]);

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {serverError && (
          <div className="bg-red-100 text-red-700 p-2 rounded">
            {serverError}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
          <input 
            id="email" 
            type="email" 
            {...register('email', { required: 'Email is required' })} 
            className={`mt-1 p-2 border rounded w-full ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="firstName" className="block text-gray-700 font-medium">First Name</label>
          <input 
            id="firstName" 
            {...register('firstName', { required: 'First Name is required' })} 
            className={`mt-1 p-2 border rounded w-full ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName" className="block text-gray-700 font-medium">Last Name</label>
          <input 
            id="lastName" 
            {...register('lastName', { required: 'Last Name is required' })} 
            className={`mt-1 p-2 border rounded w-full ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="block text-gray-700 font-medium">Phone</label>
          <input 
            id="phone" 
            type="tel" 
            {...register('phone', { required: 'Phone number is required' })} 
            className={`mt-1 p-2 border rounded w-full ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="address" className="block text-gray-700 font-medium">Address</label>
          <input 
            id="address" 
            {...register('address', { required: 'Address is required' })} 
            className={`mt-1 p-2 border rounded w-full ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="avatarFile" className="block text-gray-700 font-medium">Avatar</label>
          <input 
            id="avatarFile" 
            type="file" 
            {...register('avatarFile')} 
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateUserProfileComp;
