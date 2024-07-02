import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { CommonState, initCommonState } from '../../../../../../common/state';
import Chapter from '../../domain/entities/Chapter';
import { handleCreateChapter, handleDeleteChapter, handleGetChapterDetail, handleUpdateChapter } from './actionHandlings';

export interface ChapterState {
    chapterDetailPage: CommonState<Chapter>;
    updateChapterPage: CommonState<Chapter>;
    deleteChapterPage: CommonState<number>;
    createChapterPage: CommonState<Chapter>;
}

const initialState: ChapterState = {
    chapterDetailPage: initCommonState,
    updateChapterPage: initCommonState,
    deleteChapterPage: initCommonState,
    createChapterPage: initCommonState,
};

const teacherChapterSlice = createSlice({
    name: 'chapters',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        handleGetChapterDetail(builder);
        handleUpdateChapter(builder);
        handleDeleteChapter(builder);
        handleCreateChapter(builder);
    },
});

export default teacherChapterSlice.reducer;
