import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CommonState, initCommonState } from '../../../../../../common/state';
import { handleGetLessonDetail } from './actionHandlings';
import Lesson from '../../domain/entities/Lesson';

export interface LessonState {
    lessonDetailPage: CommonState<Lesson>;
}

const initialState: LessonState = {
    lessonDetailPage: initCommonState,
};

const lessonSlice = createSlice({
    name: 'lessons',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        handleGetLessonDetail(builder)
    }
})

export default lessonSlice.reducer;
