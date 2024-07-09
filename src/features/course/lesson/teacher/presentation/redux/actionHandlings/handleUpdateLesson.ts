import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { fetchLessonDetail, updateLesson } from "../lessonActions";
import { LessonState } from "../lessonSlice";

const handleUpdateLesson = (builder: ActionReducerMapBuilder<LessonState>) => {
    builder
        .addCase(updateLesson.pending, (state) => {
            state.updateLessonPage.status = 'loading';
        })
        .addCase(updateLesson.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.updateLessonPage.status = 'failed';
                state.updateLessonPage.error = action.payload.error;
            } else {
                state.updateLessonPage.status = 'succeeded';
                state.updateLessonPage.data = action.payload.data;
            }
        })
        .addCase(updateLesson.rejected, (state, action) => {
            state.updateLessonPage.status = 'failed';
            state.updateLessonPage.error = action.error.message;
        });

}
export default handleUpdateLesson;