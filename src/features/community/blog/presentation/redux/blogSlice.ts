import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BlogRepositoryImpl from '../../data/repositoryImpl/BlogRepositoryImpl';
import Blog from '../../domain/entities/blog';
import {
    handleUpdateBlog,
    handleFetchBlogs,
    handleFetchBlog,
    handleCreateBlog,
    handleDeleteBlog,
} from './actionHandlings';


export interface BlogState {
    blogs: Blog[] | undefined,
    blogDetail: Blog | undefined,
    status: string | null
    error: string | undefined
}
const initialState: BlogState = {
    blogs: undefined,
    blogDetail: undefined,
    status: null,
    error: undefined
}

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        handleFetchBlogs(builder);
        handleFetchBlog(builder);
        handleCreateBlog(builder);
        handleUpdateBlog(builder);
        handleDeleteBlog(builder);
    },
});

export default blogSlice.reducer;
