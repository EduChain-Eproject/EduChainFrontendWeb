import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { fetchLessonDetail } from "../lessonActions";
import { LessonState } from "../lessonSlice";

const handleGetLessonDetail = (builder: ActionReducerMapBuilder<LessonState>) => {
    builder
        .addCase(fetchLessonDetail.pending, (state) => {
            state.lessonDetailPage.status = 'loading';
        })
        .addCase(fetchLessonDetail.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.lessonDetailPage.status = 'failed';
                state.lessonDetailPage.error = action.payload.error;
            } else {
                state.lessonDetailPage.status = 'succeeded';
                state.lessonDetailPage.data = action.payload.data;
            }
        })
        .addCase(fetchLessonDetail.rejected, (state, action) => {
            state.lessonDetailPage.status = 'failed';
            state.lessonDetailPage.error = action.error.message;
        });
}
export default handleGetLessonDetail;