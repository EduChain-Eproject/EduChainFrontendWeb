import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { CourseState } from '../courseSlice';
import { fetchCoursesByStatus } from '../courseActions';

const handleGetCoursebyStatus = (builder: ActionReducerMapBuilder<CourseState>) => {
    builder
        .addCase(fetchCoursesByStatus.pending, (state) => {
            state.listCoursesPage.status = 'loading';
        })
        .addCase(fetchCoursesByStatus.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.listCoursesPage.status = 'create course failed';
                state.listCoursesPage.error = action.payload.error;
            } else {
                state.listCoursesPage.status = 'create course succeeded';
                if (action.payload.data) {
                    state.listCoursesPage.data = action.payload.data;
                }
            }
        })
        .addCase(fetchCoursesByStatus.rejected, (state, action) => {
            state.listCoursesPage.status = 'failed';
            state.listCoursesPage.error = action.error.message;
        });
};

export default handleGetCoursebyStatus;
