import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { AuthState } from "../authSlice";
import { registerAction } from "../AuthAction";

const handleRegister = (builder:ActionReducerMapBuilder<AuthState>) =>{  
    builder.addCase(registerAction.pending,
        (state) => {
            state.status = 'loading';
        }
    )
    .addCase(registerAction.fulfilled,(state,action) => {
        if (action.payload.error) {
            state.status = 'failed';
            state.error = action.payload.error;
            console.log(action.payload.error);
            return;
        } else {
            state.status = 'succeeded';
            console.log(action.payload.message);
        }
    })
}

export default handleRegister;