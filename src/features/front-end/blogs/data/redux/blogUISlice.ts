import { createSlice, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { CommonState, initCommonState } from '../../../../../common/state';
import { fetchBlogExtraReducers } from './action/fetchBlog';
import { fetchBlogsExtraReducers } from './action/fetchBlogs';
import { updateBlogExtraReducers } from './action/updateBlog';
import { deleteBlogExtraReducers } from './action/deleteBlog';
import { fetchBlogCategoriesExtraReducers } from './action/fetchCategories';
import { Blog } from '../../../../../common/entities/Blog';
import { BlogCategory } from '../../../../../common/entities/BlogCategory';
import { filterBlogExtraReducers } from './action/filterBlog';
import { voteExtraReducers } from './action/voteBlog';

export interface BlogState {
    blogs: CommonState<Blog[]>,
    blogDetail: CommonState<Blog>,
    blogCategories: CommonState<BlogCategory[]>, 
    status: string | null,
    error: string | undefined;
}

const initialState: BlogState = {
    blogs: { ...initCommonState },
    blogDetail: { ...initCommonState },
    blogCategories: { ...initCommonState }, 
    status: null,
    error: undefined,
}

const blogUISlice = createSlice({
    name: 'blogUI',
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<BlogState>) => {
        fetchBlogExtraReducers(builder);
        fetchBlogsExtraReducers(builder);
        updateBlogExtraReducers(builder);
        deleteBlogExtraReducers(builder);
        fetchBlogCategoriesExtraReducers(builder);
        filterBlogExtraReducers(builder);
        voteExtraReducers(builder);
    },
});

export default blogUISlice.reducer;
