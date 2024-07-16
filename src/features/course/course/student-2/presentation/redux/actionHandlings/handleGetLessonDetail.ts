import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { fetchLessonDetail } from '../courseActions';
import { CourseState } from '../courseSlice';

const handleGetLessonDetail = (builder: ActionReducerMapBuilder<CourseState>) => {
    builder
        .addCase(fetchLessonDetail.pending, (state) => {
            state.courseDetailPage.status = 'loading';
        })
        .addCase(fetchLessonDetail.fulfilled, (state, action) => {
            state.courseDetailPage.status = 'succeeded';
            state.lessonDetailPage.data = action.payload.data
        })
        .addCase(fetchLessonDetail.rejected, (state, action) => {
            state.courseDetailPage.status = 'failed';
            state.courseDetailPage.error = action.payload as string;
        });
};

export default handleGetLessonDetail;
