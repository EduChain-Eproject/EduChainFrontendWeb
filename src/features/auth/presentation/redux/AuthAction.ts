
import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthRepositoryImpl from '../../data/repositoryImpl/AuthRepositoryImpl';

import { AuthRepository } from './../../domain/repositories/AuthRepository';
import Register, { RegisterReq } from '../../domain/usecases/Register';
import Login, { LoginReq } from '../../domain/usecases/Login';



const authRepository:AuthRepository = new AuthRepositoryImpl();

export const logInAction = createAsyncThunk('Auth/login',
    async ({loginReq}:{loginReq:LoginReq}) => {
        const loginCase = new Login(authRepository);
        return await loginCase.execute(loginReq);
    }
)

export const registerAction = createAsyncThunk('Auth/register',
    async ({registerReq}:{registerReq:RegisterReq}) => {
        const registerCase = new Register(authRepository);
        return await registerCase.execute(registerReq);
    }
)
