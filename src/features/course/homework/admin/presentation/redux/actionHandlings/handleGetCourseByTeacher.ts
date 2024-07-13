import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { CourseState } from '../courseSlice';
import { createCourse, fetchCoursesByTeacher } from '../courseActions';

const handleGetCourseByTeacher = (builder: ActionReducerMapBuilder<CourseState>) => {
    builder
        .addCase(fetchCoursesByTeacher.pending, (state) => {
            state.listCoursesPage.status = 'loading';
        })
        .addCase(fetchCoursesByTeacher.fulfilled, (state, action) => {
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
        .addCase(fetchCoursesByTeacher.rejected, (state, action) => {
            state.listCoursesPage.status = 'failed';
            state.listCoursesPage.error = action.error.message;
        });
};

export default handleGetCourseByTeacher;
