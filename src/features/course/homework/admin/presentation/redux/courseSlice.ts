import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  handleUpdateCourse,
  handleFetchCourseDetail,
  handleDeactivateCourse,
  handleCreateCourse,
  handleGetListCategories,
} from './actionHandlings';

import { CommonState } from '../../../../../../common/state';
import handleGetCourseByTeacher from './actionHandlings/handleGetCourseByTeacher';
import Category from '../../../../course/teacher/domain/entities/Category';
import Course from '../../../../course/teacher/domain/entities/Course';


export interface CourseState {
    createCoursePage: CommonState<Category[]>,
    updateCoursePage: CommonState<Category[]>,
    courseDetailPage: CommonState<Course>,
    listCoursesPage: CommonState<Course[]>,
    deactivateCoursePage: CommonState<Course>,
}

const initCommonState = {
    data: undefined,
    status: null,
    error: undefined,
}
const initialState: CourseState = {
    courseDetailPage: initCommonState,
    createCoursePage: initCommonState,
    listCoursesPage: initCommonState,
    deactivateCoursePage: initCommonState,
    updateCoursePage: initCommonState
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
        courseChaperDeleted(state, action) {
            const deletedChapterId = action.payload;
            if (state.courseDetailPage.data?.chapters) {
                const filteredChapters = state.courseDetailPage.data.chapters.filter(
                    ch => ch.id !== deletedChapterId
                );
                state.courseDetailPage.data = {
                    ...state.courseDetailPage.data,
                    chapters: filteredChapters
                }
            }
        }
    },
    extraReducers: (builder) => {
        handleFetchCourseDetail(builder);
        handleCreateCourse(builder);
        handleUpdateCourse(builder);
        handleDeactivateCourse(builder);
        handleGetListCategories(builder);
        handleGetCourseByTeacher(builder);
    },
});

export const { clearErrorStatus, courseChaperDeleted } = teacherCourseSlice.actions;
export default teacherCourseSlice.reducer;
