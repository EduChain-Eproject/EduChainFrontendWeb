import { RouteObject } from "react-router-dom";
import { useAppDispatch } from "../../../../common/context/store"
import { logInAction } from "../redux/AuthAction";
import React from "react";
import LoginForm from "../components/LoginForm";

export const route:() => RouteObject = () => {
    return {
        path:"login",
        element:<CreateLoginPage/>
    }
}

const CreateLoginPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const handleSubmit = (data: any) => {
        dispatch(logInAction({ loginReq: data }));
    };

    return (
        <div className="flex justify-center items-center h-screen sm:h-auto bg-gray-200">
        <div className="bg-white shadow-md rounded px-8 py-6 w-full sm:w-96">
          <h1 className="text-2xl font-bold mb-4 text-center">Log In</h1>
          <LoginForm onSubmit={handleSubmit} />
        </div>
      </div>      
    )
}

export default CreateLoginPage;