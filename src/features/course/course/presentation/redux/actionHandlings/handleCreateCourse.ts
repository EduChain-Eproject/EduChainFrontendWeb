import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { CourseState } from '../courseSlice';
import { createCourse } from '../courseActions';

const handleCreateCourse = (builder: ActionReducerMapBuilder<CourseState>) => {
    builder
        .addCase(createCourse.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(createCourse.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.status = 'failed';
                state.error = action.payload.error;
            } else {
                state.status = 'succeeded';
                action.payload.data && state.courses?.push(action.payload.data);
            }
        })
        .addCase(createCourse.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
};

export default handleCreateCourse;
