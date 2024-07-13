import { createSlice } from '@reduxjs/toolkit';
import { CommonState, initCommonState } from '../../../../../common/state';
import { fetchBlogExtraReducers } from './action/fetchBlog';
import { fetchBlogsExtraReducers } from './action/fetchBlogs';
import { updateBlogExtraReducers } from './action/updateBlog';
import { deleteBlogExtraReducers } from './action/deleteBlog';
import { Blog } from '../../../../../common/entities/Blog';


export interface BlogState {
    blogs: CommonState<Blog[]>,
    blogDetail: CommonState<Blog>,
    status: string | null,
    error: string | undefined;
}
const initialState: BlogState = {
    blogs: initCommonState,
    blogDetail: initCommonState,
    status: null,
    error: undefined,
}

const blogUISlice = createSlice({
    name: 'blogUI',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        fetchBlogExtraReducers(builder);
        fetchBlogsExtraReducers(builder);
        updateBlogExtraReducers(builder);
        deleteBlogExtraReducers(builder);
    },
});

export default blogUISlice.reducer;
