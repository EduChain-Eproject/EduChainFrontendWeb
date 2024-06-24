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
            <form action="/submit" method="post">
        <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required/>
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required/>
        </div>
        <div>
            <button type="submit">Login</button>
        </div>
    </form>       
    </div>
);
}

