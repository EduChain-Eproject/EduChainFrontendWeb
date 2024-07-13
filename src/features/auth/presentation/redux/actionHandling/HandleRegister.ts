import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { AuthState } from "../authSlice";
import { registerAction } from "../AuthAction";

const handleRegister = (builder:ActionReducerMapBuilder<AuthState>) =>{  
    builder.addCase(registerAction.pending,
        (state) => {
            state.signUpPage.status = 'loading';
        }
    )
    .addCase(registerAction.fulfilled,(state,action) => {
        if (action.payload.error) {
            state.signUpPage.status = 'failed';
            state.signUpPage.error = action.payload.error;
            console.log(action.payload.error);
            return;
        } else {
            state.signUpPage.status = 'succeeded';
            console.log(action.payload.message);
        }
    })
}

export default handleRegister;