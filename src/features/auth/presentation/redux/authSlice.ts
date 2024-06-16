import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import AuthRepositoryImpl from '../../data/repositories/AuthRepositoryImpl';
// import LoginUser from '../../domain/usecases/LoginUser';
// import LogoutUser from '../../domain/usecases/LogoutUser';
// import CheckAuth from '../../domain/usecases/CheckAuth';
import { User } from '../../domain/entities/User.ts';
import handleLogin from './actionHandling/HandleLogin.ts';

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    token: string | null;
    refreshToken: string | null;
}

const initialState: AuthState = {
    user: new User("Admin"),
    isAuthenticated: true,
    status: 'idle',
    error: null,
    token:  null,
    refreshToken:  null,
};

// const authRepository = new AuthRepositoryImpl();
// const loginUser = new LoginUser(authRepository);
// const logoutUser = new LogoutUser(authRepository);
// const checkAuth = new CheckAuth(authRepository);

// export const authenticateUser = createAsyncThunk(
//   'auth/authenticateUser',
//   async ({ email, password }: { email: string; password: string }) => {
//     const userData = await loginUser.execute({ email, password });
//     authRepository.saveAccessToken(userData.accessToken);
//     authRepository.saveRefreshToken(userData.refreshToken);
//     return userData;
//   }
// );

// export const signOutUser = createAsyncThunk('auth/signOutUser', async () => {
//   await logoutUser.execute();
//   authRepository.removeTokens();
// });

// export const verifyAuth = createAsyncThunk('auth/verifyAuth', async () => {
//   const isAuthenticated = await checkAuth.execute();
//   return isAuthenticated;
// });

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // builder
        //   .addCase(authenticateUser.pending, (state) => {
        //     state.status = 'loading';
        //   })
        //   .addCase(authenticateUser.fulfilled, (state, action) => {
        //     state.status = 'succeeded';
        //     state.isAuthenticated = true;
        //     state.user = action.payload.user;
        //   })
        //   .addCase(authenticateUser.rejected, (state, action) => {
        //     state.status = 'failed';
        //     state.error = action.error.message;
        //   })
        //   .addCase(signOutUser.fulfilled, (state) => {
        //     state.isAuthenticated = false;
        //     state.user = null;
        //   })
        //   .addCase(verifyAuth.fulfilled, (state, action) => {
        //     state.isAuthenticated = action.payload;
        //   });
        handleLogin(builder);
    },
});

export default authSlice.reducer;
