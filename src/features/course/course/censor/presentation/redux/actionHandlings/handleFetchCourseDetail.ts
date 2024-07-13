import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { CourseState } from '../courseSlice';
import { fetchCourseDetail } from '../courseActions';

const handleFetchCourseDetail = (builder: ActionReducerMapBuilder<CourseState>) => {
    builder
        .addCase(fetchCourseDetail.pending, (state) => {
            state.courseDetailPage.status = 'loading';
        })
        .addCase(fetchCourseDetail.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.courseDetailPage.status = 'failed';
                state.courseDetailPage.error = action.payload.error;
            } else {
                state.courseDetailPage.status = 'succeeded';
                state.courseDetailPage.data = action.payload.data;
            }
        })
        .addCase(fetchCourseDetail.rejected, (state, action) => {
            state.courseDetailPage.status = 'failed';
            state.courseDetailPage.error = action.error.message;
        });
};

export default handleFetchCourseDetail;
