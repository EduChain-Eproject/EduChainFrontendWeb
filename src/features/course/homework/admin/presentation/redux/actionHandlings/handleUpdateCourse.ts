import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { CourseState } from '../courseSlice';
import { updateCourse } from '../courseActions';

const handleUpdateCourse = (builder: ActionReducerMapBuilder<CourseState>) => {
    builder
        .addCase(updateCourse.pending, (state) => {
            state.updateCoursePage.status = 'loading';
        })
        .addCase(updateCourse.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.updateCoursePage.status = 'failed';
                state.updateCoursePage.error = action.payload.error;
            } else {
                state.updateCoursePage.status = 'succeeded';
                state.courseDetailPage.data = action.payload.data;
            }
        })
        .addCase(updateCourse.rejected, (state, action) => {
            state.updateCoursePage.status = 'failed';
            state.updateCoursePage.error = action.error.message;
        });
};

export default handleUpdateCourse;
