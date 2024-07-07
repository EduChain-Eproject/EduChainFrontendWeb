import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { deleteLesson } from "../lessonActions";
import { LessonState } from "../lessonSlice";

const handleDeleteLesson = (builder: ActionReducerMapBuilder<LessonState>) => {
    builder
        .addCase(deleteLesson.pending, (state) => {
            state.deleteLessonPage.status = 'loading';
        })
        .addCase(deleteLesson.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.deleteLessonPage.status = 'failed';
                state.deleteLessonPage.error = action.payload.error;
            } else {
                state.deleteLessonPage.status = 'succeeded';
                state.deleteLessonPage.data = action.payload.data;
            }
        })
        .addCase(deleteLesson.rejected, (state, action) => {
            state.deleteLessonPage.status = 'failed';
            state.deleteLessonPage.error = action.error.message;
        });

}
export default handleDeleteLesson;