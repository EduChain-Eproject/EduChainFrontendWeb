import { RouteObject } from "react-router-dom"
import { registerAction } from "../redux/AuthAction";
import React from "react";
import { useAppDispatch } from "../../../../common/context/store";
import RegisterForm from "../components/RegisterForm";

export const route: () => RouteObject = () => {
    return {
        path: "register",
        element: <CreateRegisterPage />
    }
}

const CreateRegisterPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const handleSubmit = (data: any) => {
        dispatch(registerAction({ registerReq: data }));
    };

    return (
        <div>
            <h1>register</h1>
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    )
}

export default CreateRegisterPage;