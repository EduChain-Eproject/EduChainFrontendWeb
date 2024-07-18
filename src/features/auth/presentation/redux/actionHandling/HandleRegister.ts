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
            return;
        } else {
            console.log(action.payload);
            
            console.log('thanh cong r ');
            
            state.signUpPage.status = 'succeeded';
        }
    })
}

export default handleRegister;