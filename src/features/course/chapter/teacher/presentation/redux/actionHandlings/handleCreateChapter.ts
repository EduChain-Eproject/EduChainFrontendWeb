import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { ChapterState } from "../courseSlice";
import { createChapter } from "../courseActions";

const handleCreateChapter = (builder: ActionReducerMapBuilder<ChapterState>) => {
    builder
        .addCase(createChapter.pending, (state) => {
            state.createChapterPage.status = 'loading';
        })
        .addCase(createChapter.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.createChapterPage.status = 'failed';
                state.createChapterPage.error = action.payload.error;
            } else {
                state.createChapterPage.status = 'succeeded';
                state.createChapterPage.data = action.payload.data;
            }
        })
        .addCase(createChapter.rejected, (state, action) => {
            state.createChapterPage.status = 'failed';
            state.createChapterPage.error = action.error.message;
        });
};

export default handleCreateChapter;