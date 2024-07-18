import React, { useEffect } from "react";
import { ResetPasswordReq,  } from "../../domain/usecases/ResetPassword";
import { useForm } from "react-hook-form";

interface ResetPasswordFormPorps{
    initialData?:ResetPasswordReq
    onSubmit:(data:any) => void;
}

const ResetPasswordForm:React.FC<ResetPasswordFormPorps> = ({
    initialData,onSubmit
}) => {
    const {register,handleSubmit,reset} = useForm<ResetPasswordReq>({
        defaultValues:initialData || {}
    });

    useEffect(() => {
        if(initialData){
            reset(initialData);
        }
    },[initialData,reset]);
    
return(
    <div>
    <form id="resetPasswordForm" onSubmit={handleSubmit(onSubmit)}>
<div className="form-group">
    <label htmlFor="email">Email</label>
    <input type="email" id="email" 
    {...register('email', { required: true })} />
</div>
<div className="form-group">
    <label htmlFor="newPassword">New Password</label>
    <input type="password" id="newPassword" {...register('password', { required: true })}  required/>
</div>
<div className="form-group">
    <label htmlFor="confirmPassword">Confirm Password</label>
    <input type="password" id="confirmPassword" name="confirmPassword" required/>
</div>
<button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Submit</button>
<div className="error" id="error"></div>
</form>

</div>
);
}

export default ResetPasswordForm;