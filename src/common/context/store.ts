import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from '../../features/auth/presentation/redux/authSlice';
// import userReducer from './features/user/presentation/redux/userSlice';
// import adminReducer from './features/admin/presentation/redux/adminSlice';
// import teacherReducer from './features/teacher/presentation/redux/teacherSlice';
// import censorReducer from './features/censor/presentation/redux/censorSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    // user: userReducer,
    // admin: adminReducer,
    // teacher: teacherReducer,
    // censor: censorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
