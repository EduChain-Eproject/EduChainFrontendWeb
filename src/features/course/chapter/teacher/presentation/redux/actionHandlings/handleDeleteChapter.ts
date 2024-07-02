import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { ChapterState } from "../courseSlice";
import { deleteChapter } from "../courseActions";

const handleDeleteChapter = (builder: ActionReducerMapBuilder<ChapterState>) => {
    builder
        .addCase(deleteChapter.pending, (state) => {
            state.deleteChapterPage.status = 'loading';
        })
        .addCase(deleteChapter.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.deleteChapterPage.status = 'failed';
                state.deleteChapterPage.error = action.payload.error;
            } else {
                state.deleteChapterPage.status = 'succeeded';
                state.deleteChapterPage.data = action.payload.data;
            }
        })
        .addCase(deleteChapter.rejected, (state, action) => {
            state.deleteChapterPage.status = 'failed';
            state.deleteChapterPage.error = action.error.message;
        });
};

export default handleDeleteChapter
