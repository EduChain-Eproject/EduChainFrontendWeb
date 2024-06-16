import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { AuthState } from "../authSlice";
import { logInAction } from "../AuthAction";

const handleLogin = (builder: ActionReducerMapBuilder<AuthState>) =>{
    builder.addCase(logInAction.pending,
        (state) => {
            state.status = 'loading';
        }
    )
    .addCase(logInAction.fulfilled,(state,action)=> {
        if (action.payload.error) {
            state.status = 'failed';
            state.error = action.payload.error;
            console.log(action.payload.error);
            return;
        } else {
            state.status = 'succeeded';
            console.log(action.payload.data)
            if (action.payload.data) {
                localStorage.setItem('accessToken', action.payload.data.object.accessToken.toString());
                localStorage.setItem('refreshToken', action.payload.data.object.refreshToken.toString());
            }
        }
    });
}

export default handleLogin;