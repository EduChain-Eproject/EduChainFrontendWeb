import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Course from '../../domain/entities/Course';
import {
    handleFetchCourseDetail,
    handleChangeCourseStatus,
} from './actionHandlings';
import Category from '../../domain/entities/Category';
import { CommonState } from '../../../../../../common/state';
import handleGetCourseByStatus from './actionHandlings/handleGetCourseByStatus';
import Page from '../../domain/entities/Page';


export interface CourseState {
    courseDetailPage: CommonState<Course>,
    listCoursesPage: CommonState<Page<Course>>,
    changeStatusOfCoursePage: CommonState<Course>,
}

const initCommonState = {
    data: undefined,
    status: null,
    error: undefined,
}

const initialState: CourseState = {
    courseDetailPage: initCommonState,
    listCoursesPage: initCommonState,
    changeStatusOfCoursePage: initCommonState,
}

const censorCourseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        handleFetchCourseDetail(builder);
        handleChangeCourseStatus(builder);
        handleGetCourseByStatus(builder);
    },
});

export default censorCourseSlice.reducer;
