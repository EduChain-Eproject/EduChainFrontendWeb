import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { ChapterState } from "../courseSlice";
import { updateChapter } from "../courseActions";

const handleUpdateChapter = (builder: ActionReducerMapBuilder<ChapterState>) => {
    builder
        .addCase(updateChapter.pending, (state) => {
            state.updateChapterPage.status = 'loading';
        })
        .addCase(updateChapter.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.updateChapterPage.status = 'failed';
                state.updateChapterPage.error = action.payload.error;
            } else {
                state.updateChapterPage.status = 'succeeded';
                state.updateChapterPage.data = action.payload.data;
            }
        })
        .addCase(updateChapter.rejected, (state, action) => {
            state.updateChapterPage.status = 'failed';
            state.updateChapterPage.error = action.error.message;
        });
};

export default handleUpdateChapter