import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BlogCateRepositoryImpl from '../../data/repositoryImpl/BlogCateRepositoryImpl';
import { BlogCategory } from '../../domain/entities/BlogCategory';
import {
    handleCreateCate,
    handleDeleteCate,
    handleFetchCate,
    handleFetchCates,
    handleUpdateCate
} from './actionHandlings';

export interface CateState {
    cates: BlogCategory[] | undefined,
    cate: BlogCategory | undefined,
    status: string | null
    error: string | undefined
}
const initialState: CateState = {
    cates: undefined,
    cate: undefined,
    status: null,
    error: undefined
}

const cateSlice = createSlice({
    name: 'cates',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        handleCreateCate(builder);
        handleUpdateCate(builder);
        handleFetchCates(builder);
        handleFetchCate(builder);
        handleDeleteCate(builder);
    },
});

export default cateSlice.reducer;
