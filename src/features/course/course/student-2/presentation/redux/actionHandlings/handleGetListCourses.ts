import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { searchCourses } from '../courseActions';
import { CourseState } from '../courseSlice';

const handleGetListCourses = (builder: ActionReducerMapBuilder<CourseState>) => {
    builder
        .addCase(searchCourses.pending, (state) => {
            state.listCoursesPage.status = 'loading';
        })
        .addCase(searchCourses.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.listCoursesPage.status = 'create course failed';
                state.listCoursesPage.error = action.payload.error;
            } else {
                state.listCoursesPage.status = 'create course succeeded';
                if (action.payload.data && state.listCoursesPage.data) {
                    state.listCoursesPage.data.courses = action.payload.data;
                }
            }
        })
        .addCase(searchCourses.rejected, (state, action) => {
            state.listCoursesPage.status = 'failed';
            state.listCoursesPage.error = action.error.message;
        });
};

export default handleGetListCourses;
