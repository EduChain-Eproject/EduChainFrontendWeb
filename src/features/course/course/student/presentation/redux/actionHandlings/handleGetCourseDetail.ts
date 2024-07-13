import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { fetchCourseDetail } from '../courseActions';
import { CourseState } from '../courseSlice';

const handleGetCourseDetail = (builder: ActionReducerMapBuilder<CourseState>) => {
    builder
        .addCase(fetchCourseDetail.pending, (state) => {
            state.courseDetailPage.status = 'loading';
        })
        .addCase(fetchCourseDetail.fulfilled, (state, action) => {
            state.courseDetailPage.status = 'succeeded';
            state.courseDetailPage.data = action.payload.data;
        })
        .addCase(fetchCourseDetail.rejected, (state, action) => {
            state.courseDetailPage.status = 'failed';
            state.courseDetailPage.error = action.payload as string;
        });
};

export default handleGetCourseDetail;
