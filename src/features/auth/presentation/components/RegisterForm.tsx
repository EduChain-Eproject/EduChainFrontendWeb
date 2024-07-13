import React, { useEffect, useState } from "react";
import { RegisterReq, Role } from "../../domain/usecases/Register";
import { useForm } from "react-hook-form";
import { LoginReq } from "../../domain/usecases/Login";

interface RegisterFormPorps{
    initialData?:RegisterReq;
    onSubmit:(data:any) => void;
}


const RegisterForm:React.FC<RegisterFormPorps> = ({initialData,onSubmit}) =>{
    const {register, handleSubmit, reset} = useForm<RegisterReq>({
        defaultValues:initialData || {}
    });
  
    useEffect(()=>{
        if(initialData){
            reset(initialData);
        }
    },[initialData,reset]);
    
    return (
      <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" {...register('email', { required: true })} type="email" />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" {...register('firstName', { required: true })} type="text" />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" {...register('lastName', { required: true })} type="text" />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input id="phone" {...register('phone', { required: true })} type="text" />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input id="address" {...register('address', { required: true })} type="text" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" {...register('password', { required: true })} type="password" />
        </div>
        <div>
          <label htmlFor="role">Role</label>
          <select id="role" {...register('role', { required: true })}>
            <option value={Role.STUDENT}>Student</option>
            <option value={Role.TEACHER}>Teacher</option>
            <option value={Role.SUPERVISOR}>Supervisor</option>
          </select>
        </div>
        <button type="submit">Submit</button>
     </form>
   </div>

    );
  }
    export default RegisterForm;