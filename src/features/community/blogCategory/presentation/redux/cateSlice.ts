import { createSlice } from '@reduxjs/toolkit';
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
    status: string | null,
    errorCreate: string | undefined
    errorUpdate: string | undefined
    errorDelete: string | undefined
    errorFetchCates: string | undefined
    errorFetchCate: string | undefined
}
const initialState: CateState = {
    cates: undefined,
    cate: undefined,
    status: null,
    errorDelete: undefined,
    errorCreate: undefined,
    errorFetchCate: undefined,
    errorFetchCates: undefined,
    errorUpdate: undefined
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
