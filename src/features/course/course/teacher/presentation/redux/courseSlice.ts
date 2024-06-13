import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CourseRepositoryImpl from '../../data/repositoryImpl/CourseRepositoryImpl';
import Course from '../../domain/entities/Course';
import {
    handleUpdateCourse,
    handleFetchCourses,
    handleFetchCourseDetail,
    handleDeleteCourse,
    handleCreateCourse,
} from './actionHandlings';


export interface CourseState {
    courses: Course[] | undefined,
    courseDetail: Course | undefined,
    status: string | null
    error: string | undefined
}
const initialState: CourseState = {
    courses: undefined,
    courseDetail: undefined,
    status: null,
    error: undefined
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
    },
});

export default teacherCourseSlice.reducer;
