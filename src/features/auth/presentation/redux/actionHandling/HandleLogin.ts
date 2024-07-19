import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { AuthState } from "../authSlice";
import { logInAction } from "../AuthAction";

const handleLogin = (builder: ActionReducerMapBuilder<AuthState>) =>{
    builder.addCase(logInAction.pending,
        (state) => {
            state.logInPage.status = 'loading';
        }
    )
    .addCase(logInAction.fulfilled,(state,action)=> {
        if (action.payload.error) {
            state.logInPage.status = 'failed';
            state.logInPage.error = action.payload.error;
            console.log(state.logInPage.error);
            return;
        } else {
            state.logInPage.status = 'login succeeded';
            if (action.payload.data) {
                state.isAuthenticated = true;
                localStorage.setItem('accessToken', action.payload.data.object.accessToken.toString());
                localStorage.setItem('refreshToken', action.payload.data.object.refreshToken.toString());
            }
        }
    });
}

export default handleLogin;