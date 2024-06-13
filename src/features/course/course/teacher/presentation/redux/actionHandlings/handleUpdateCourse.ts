import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { CourseState } from '../courseSlice';
import { updateCourse } from '../courseActions';

const handleUpdateCourse = (builder: ActionReducerMapBuilder<CourseState>) => {
    builder
        .addCase(updateCourse.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(updateCourse.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.status = 'failed';
                state.error = action.payload.error;
            } else {
                state.status = 'succeeded';
                const updatedCourse = action.payload.data;
                const index = state.courses?.findIndex(course => course.id === updatedCourse?.id);
                if (index !== undefined && index !== -1 && updatedCourse != undefined && state.courses != undefined) {
                    state.courses[index] = updatedCourse;
                }
            }
        })
        .addCase(updateCourse.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
};

export default handleUpdateCourse;
