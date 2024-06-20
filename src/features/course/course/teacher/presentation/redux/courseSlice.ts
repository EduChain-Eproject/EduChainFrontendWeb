import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Course from '../../domain/entities/Course';
import {
    handleUpdateCourse,
    handleFetchCourses,
    handleFetchCourseDetail,
    handleDeleteCourse,
    handleCreateCourse,
    handleGetListCategories,
} from './actionHandlings';
import Category from '../../domain/entities/Category';


export interface CourseState {
    courses: Course[] | undefined,
    courseDetail: Course | undefined,
    status: string | null
    error: string | undefined,
    categories: Category[] | undefined
}
const initialState: CourseState = {
    courses: undefined,
    courseDetail: undefined,
    status: null,
    error: undefined,
    categories: undefined
}

const teacherCourseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        handleFetchCourses(builder);
        handleFetchCourseDetail(builder);
        handleCreateCourse(builder);
        handleUpdateCourse(builder);
        handleDeleteCourse(builder);
        handleGetListCategories(builder);
    },
});

export default teacherCourseSlice.reducer;
