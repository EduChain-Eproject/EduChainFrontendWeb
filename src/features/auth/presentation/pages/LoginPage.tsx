import { RouteObject, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../common/context/store"
import { logInAction, SendResetPasswordEmailAction } from "../redux/AuthAction";
import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm";



export const route:() => RouteObject = () => {
    return {
        path:"login",
        element:<CreateLoginPage/>
    }
}

const CreateLoginPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const {status, error, data} = useAppSelector(state => state.auth.logInPage);

    const handleSubmit = (data: any) => {
        dispatch(logInAction({ loginReq: data }));
    };

    const handleSubmitReset = (data: any) => {
        dispatch(SendResetPasswordEmailAction({ req: data }));
    };

    return (
        <div className="flex justify-center items-center h-screen sm:h-auto bg-gray-200">
        <div className="bg-white shadow-md rounded px-8 py-6 w-full sm:w-96">
          <h1 className="text-2xl font-bold mb-4 text-center">Log In</h1>
          <LoginForm onSubmit={handleSubmit} onSubmitReset={handleSubmitReset}  />
        </div>
      </div>      
    )
}

export default CreateLoginPage;