import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from '../../features/auth/presentation/redux/authSlice';
import teacherCourseSlice from '../../features/course/course/teacher/presentation/redux/courseSlice'
// import userReducer from './features/user/presentation/redux/userSlice';
// import adminReducer from './features/admin/presentation/redux/adminSlice';
// import teacherReducer from './features/teacher/presentation/redux/teacherSlice';
// import censorReducer from './features/censor/presentation/redux/censorSlice';

const courses = combineReducers({
    teacher: teacherCourseSlice
});

const rootReducer = combineReducers({
    auth: authReducer,
    courses: courses,
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
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
