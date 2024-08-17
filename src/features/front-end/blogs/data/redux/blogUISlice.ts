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
import { createBlogExtraReducers } from './action/createBlog';
import { BlogComment } from '../../../../../common/entities/BlogComment';
import { createBlogCommentExtraReducers } from './action/CreateComment';

export interface BlogState {
  blogs: CommonState<Blog[]>;
  blogDetail: CommonState<Blog>;
  blogCategories: CommonState<BlogCategory[]>;
  status: string | null;
  error: string | undefined;
  blogCreateState: CommonState<Blog>;
  createCommentState: CommonState<BlogComment>;
  pagination: {
    totalPages: number;
    totalElements: number;
    currentPage: number;
  };
}

const initialState: BlogState = {
  blogs: { ...initCommonState },
  blogDetail: { ...initCommonState },
  blogCategories: { ...initCommonState },
  status: null,
  error: undefined,
  blogCreateState: { ...initCommonState },
  createCommentState: { ...initCommonState },
  pagination: {
    totalPages: 0,
    totalElements: 0,
    currentPage: 0,
  },
};

const blogUISlice = createSlice({
  name: 'blogUI',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<BlogState>) => {
    fetchBlogExtraReducers(builder);
    fetchBlogsExtraReducers(builder);
    updateBlogExtraReducers(builder);
    deleteBlogExtraReducers(builder);
    fetchBlogCategoriesExtraReducers(builder);
    filterBlogExtraReducers(builder);
    voteExtraReducers(builder);
    createBlogExtraReducers(builder);
    createBlogCommentExtraReducers(builder);
  },
});
export const { setPage } = blogUISlice.actions;
export default blogUISlice.reducer;
