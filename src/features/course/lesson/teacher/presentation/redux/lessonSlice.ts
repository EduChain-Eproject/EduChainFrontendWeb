import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CommonState, initCommonState } from '../../../../../../common/state';
import { handleDeleteLesson, handleGetLessonDetail, handleUpdateLesson } from './actionHandlings';
import Lesson from '../../domain/entities/Lesson';

export interface LessonState {
    lessonDetailPage: CommonState<Lesson>;
    updateLessonPage: CommonState<Lesson>;
    deleteLessonPage: CommonState<number>;
}

const initialState: LessonState = {
    lessonDetailPage: initCommonState,
    updateLessonPage: initCommonState,
    deleteLessonPage: initCommonState,
};

const lessonSlice = createSlice({
    name: 'lessons',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        handleGetLessonDetail(builder);
        handleUpdateLesson(builder);
        handleDeleteLesson(builder);
    }
})

export default lessonSlice.reducer;
