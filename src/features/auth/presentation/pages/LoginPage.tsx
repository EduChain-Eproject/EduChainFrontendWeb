import { RouteObject, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../common/context/store"
import { logInAction, SendResetPasswordEmailAction } from "../redux/AuthAction";
import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm";



export const route: () => RouteObject = () => {
    return {
        path: "login",
        element: <LoginPage />
    }
}

const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch(); 
    // const navigate = useNavigate(); 
    // const status = useAppSelector((s)=>s.auth.logInPage.status);
    const handleSubmit = (data: any) => {
        dispatch(logInAction({ loginReq: data }));
    };

    const handleSubmitReset = (data: any) => {
        dispatch(SendResetPasswordEmailAction({ req: data }));
    };


    return (
        <div>
            <div>
                <LoginForm onSubmit={handleSubmit} onSubmitReset={handleSubmitReset} />
            </div>
        </div>
    )
}

export default LoginPage;