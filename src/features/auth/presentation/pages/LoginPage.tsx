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
        <div className="min-h-screen bg-cover"
            style={{
                backgroundImage:
                    "url('https://res.cloudinary.com/dcxzqj0ta/image/upload/v1724576548/ijet9ronlxu9vb4stjfl.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            <div className="pt-16">
                <LoginForm onSubmit={handleSubmit} onSubmitReset={handleSubmitReset} />
            </div>

        </div>
    )
}

export default LoginPage;