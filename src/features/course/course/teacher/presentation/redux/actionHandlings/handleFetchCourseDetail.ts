import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { CourseState } from '../courseSlice';
import { fetchCourseDetail } from '../courseActions';

const handleFetchCourseDetail = (builder: ActionReducerMapBuilder<CourseState>) => {
    builder
        .addCase(fetchCourseDetail.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchCourseDetail.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.status = 'failed';
                state.error = action.payload.error;
            } else {
                state.status = 'succeeded';
                state.courseDetail = action.payload.data;
            }
        })
        .addCase(fetchCourseDetail.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
};

export default handleFetchCourseDetail;
