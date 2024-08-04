import React, { useEffect } from "react";
import { ResetPasswordReq } from "../../domain/usecases/ResetPassword";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../common/context/store";
import { useNavigate } from "react-router-dom";
import { resetPasswordPageAction } from "../redux/AuthAction";

interface ResetPasswordFormProps {
  initialData?: ResetPasswordReq;
  onSubmit: (data: any) => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  initialData,
  onSubmit
}) => {
  const { register, handleSubmit, reset } = useForm<ResetPasswordReq>({
    defaultValues: initialData || {}
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {data,status ,error,errors} = useAppSelector((s) => s.auth.resetPasswordPage);
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);
  useEffect(() => {
    if(status === 'succeeded'){
      dispatch(resetPasswordPageAction());
      alert('success reset password');
      navigate('/Auth/login');
    }
  },[status])

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h2 className="text-2xl font-bold mb-4">Reset password</h2>
      <form id="resetPasswordForm" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-group">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input 
            type="email" 
            id="email" 
            className="w-full px-4 py-2 border rounded" 
            {...register('email')} 
          />
             {errors?.email && (
              <p className="text-red-500 text-xs italic mt-1">{errors?.email}</p>
            )}
        </div>
        <div className="form-group">
          <label htmlFor="verificationCode" className="block text-gray-700">verify code</label>
          <input 
            type="text" 
            id="code" 
            className="w-full px-4 py-2 border rounded" 
            {...register('code')} 
          />
             {errors?.code && (
              <p className="text-red-500 text-xs italic mt-1">{errors?.code}</p>
            )}
        </div>
        <div className="form-group">
          <label htmlFor="newPassword" className="block text-gray-700">new password</label>
          <input 
            type="password" 
            id="newPassword" 
            className="w-full px-4 py-2 border rounded" 
            {...register('password')}  
          />
               {errors?.password && (
              <p className="text-red-500 text-xs italic mt-1">{errors?.password}</p>
            )}
        </div>
        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
         send
        </button>
        <div className="error" id="error"></div>
        
      </form>
      {errors?.message && (
              <p className="text-red-500 text-xs italic mt-1">{errors?.message}</p>
            )}
    </div>
  );
};

export default ResetPasswordForm;
