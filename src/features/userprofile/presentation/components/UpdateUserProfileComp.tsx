import React, { useEffect } from 'react';
import { useAppSelector } from '../../../../common/context/store';
import { UpdateUserProfileReq } from '../../domain/usecases/UpdateUserProfileUseCase';
import { useForm } from 'react-hook-form';
import { UserProfileModel } from '../../domain/entities/UserProfileModel';

interface Props {
  initialData:UserProfileModel | undefined;
  onSubmit:(data:any) => void;
}
const UpdateUserProfileComp: React.FC<Props> = (
  {initialData,onSubmit}
) => {

  const {register,handleSubmit,reset,setValue} = useForm<UpdateUserProfileReq>({defaultValues:{
    id:initialData?.id
  }})
  //set old data for form

  useEffect(() => {
    if (initialData) {
      setValue('id', initialData.id);
      setValue('email', initialData.email);
      setValue('password', initialData.password);
      setValue('firstName', initialData.firstName);
      setValue('lastName', initialData.lastName);
      setValue('phone', initialData.phone);
      setValue('address', initialData.address);
      setValue('avatarPath', initialData.avatarPath);
    }
  }, [initialData, setValue]);
  //
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input type="email" {...register('email')} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register('password')} />
      </div>
      <div>
        <label>First Name</label>
        <input {...register('firstName')} />
      </div>
      <div>
        <label>Last Name</label>
        <input {...register('lastName')} />
      </div>
      <div>
        <label>Phone</label>
        <input type="tel" {...register('phone')} />
      </div>
      <div>
        <label>Address</label>
        <input {...register('address')} />
      </div>
      <div>
        <label>Avatar</label>
        <input type="file" {...register('avatarFile')} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UpdateUserProfileComp;


