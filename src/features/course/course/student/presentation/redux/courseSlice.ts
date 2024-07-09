import { createSlice } from '@reduxjs/toolkit';
import Course from '../../domain/entities/Course';
import {
    handleGetCourseDetail,
    handleGetLessonDetail,
    handleGetListCategories,
    handleGetListCourses,
} from './actionHandlings';
import { CommonState, initCommonState } from '../../../../../../common/state';
import Category from '../../domain/entities/Category';
import Page from '../../domain/entities/Page';
import Lesson from '../../domain/entities/Lesson';


export interface ListCoursesPage {
    courses?: Page<Course>;
    categories?: Category[];
}

export interface CourseState {
    listCoursesPage: CommonState<ListCoursesPage>;
    courseDetailPage: CommonState<Course>;
    lessonDetailPage: CommonState<Lesson>
}

const initialState: CourseState = {
    listCoursesPage: {
        ...initCommonState,
        data: {
            categories: [],
            courses: undefined
        }
    },
    courseDetailPage: initCommonState,
    lessonDetailPage: initCommonState,
};


const studentCourseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        handleGetListCourses(builder);
        handleGetListCategories(builder);
        handleGetCourseDetail(builder);
        handleGetLessonDetail(builder)
    },
});

export default studentCourseSlice.reducer;
