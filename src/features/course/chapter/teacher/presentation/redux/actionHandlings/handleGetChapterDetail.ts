import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { ChapterState } from "../courseSlice";
import { getChapterDetail } from "../courseActions";

const handleGetChapterDetail = (builder: ActionReducerMapBuilder<ChapterState>) => {
    builder
        .addCase(getChapterDetail.pending, (state) => {
            state.chapterDetailPage.status = 'loading';
        })
        .addCase(getChapterDetail.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.chapterDetailPage.status = 'failed';
                state.chapterDetailPage.error = action.payload.error;
            } else {
                state.chapterDetailPage.status = 'succeeded';
                state.chapterDetailPage.data = action.payload.data;
            }
        })
        .addCase(getChapterDetail.rejected, (state, action) => {
            state.chapterDetailPage.status = 'failed';
            state.chapterDetailPage.error = action.error.message;
        });
};

export default handleGetChapterDetail;