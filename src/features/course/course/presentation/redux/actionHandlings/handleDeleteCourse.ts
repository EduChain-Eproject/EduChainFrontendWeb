import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { CourseState } from '../courseSlice';
import { deleteCourse } from '../courseActions';

const handleDeleteCourse = (builder: ActionReducerMapBuilder<CourseState>) => {
    builder
        .addCase(deleteCourse.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(deleteCourse.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.status = 'failed';
                state.error = action.payload.error;
            } else {
                state.status = 'succeeded';
                state.courses = state.courses?.filter(course => course.id !== action.meta.arg);
            }
        })
        .addCase(deleteCourse.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
};

export default handleDeleteCourse;
