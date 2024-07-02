import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from '../../features/auth/presentation/redux/authSlice';
import teacherCourseSlice from '../../features/course/course/teacher/presentation/redux/courseSlice'
import teacherChapterSlice from '../../features/course/chapter/teacher/presentation/redux/courseSlice'
import teacherLessonSlice from '../../features/course/lesson/teacher/presentation/redux/lessonSlice'
import blogSlice from '../../features/community/blog/presentation/redux/blogSlice';
import cateSlice from '../../features/community/blogCategory/presentation/redux/cateSlice';

const courses = combineReducers({
    teacher: teacherCourseSlice
});

const chapters = combineReducers({
    teacher: teacherChapterSlice
});

const lessons = combineReducers({
    teacher: teacherLessonSlice
});


const rootReducer = combineReducers({
    auth: authReducer,
    courses: courses,
    blogs: blogSlice,
    cates: cateSlice,
    chapters,
    lessons
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
