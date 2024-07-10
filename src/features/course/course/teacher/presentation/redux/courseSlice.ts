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
import { CommonState, initCommonState } from '../../../../../../common/state';

export interface CourseState {
    createCoursePage: CommonState<Category[]>,
    courseDetailPage: CommonState<Course>,
    listCoursesPage: CommonState<Course[]>,
    deactivateCoursePage: CommonState<Course>,
}


const initialState: CourseState = {
    courseDetailPage: initCommonState,
    createCoursePage: initCommonState,
    listCoursesPage: initCommonState,
    deactivateCoursePage: initCommonState,
}

const teacherCourseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        clearErrorStatus(state, action) {
            if (action.payload == "createCoursePage") {
                state.createCoursePage.status = null;
                state.createCoursePage.error = undefined;
            }
        },
    },
    extraReducers: (builder) => {
        handleFetchCourses(builder);
        handleFetchCourseDetail(builder);
        handleCreateCourse(builder);
        handleUpdateCourse(builder);
        handleDeleteCourse(builder);
        handleGetListCategories(builder);
    },
});

export const { clearErrorStatus } = teacherCourseSlice.actions;
export default teacherCourseSlice.reducer;
