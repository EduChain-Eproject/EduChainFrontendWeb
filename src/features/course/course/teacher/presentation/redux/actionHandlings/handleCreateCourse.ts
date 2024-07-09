import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { CourseState } from '../courseSlice';
import { createCourse } from '../courseActions';

const handleCreateCourse = (builder: ActionReducerMapBuilder<CourseState>) => {
    builder
        .addCase(createCourse.pending, (state) => {
            state.createCoursePage.status = 'loading';
        })
        .addCase(createCourse.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.createCoursePage.status = 'create course failed';
                state.createCoursePage.error = action.payload.error;
            } else {
                state.createCoursePage.status = 'create course succeeded';
                action.payload.data && state.listCoursesPage.data?.push(action.payload.data);
            }
        })
        .addCase(createCourse.rejected, (state, action) => {
            state.createCoursePage.status = 'failed';
            state.createCoursePage.error = action.error.message;
        });
};

export default handleCreateCourse;
