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
import { CommonState, initCommonState } from '../../../../../common/state';

export interface BlogState {
  blogs: CommonState<Blog[]>;
  blog: CommonState<Blog>;
  blogDetail: Blog | undefined;
  status: string | null;
  error: string | undefined;
  createBlog: CommonState<Blog>;
  pagination: {
    totalPages: number;
    totalElements: number;
    currentPage: number;
  };
  deleteBlog: CommonState<Blog[]>;
}
const initialState: BlogState = {
  blogs: initCommonState,
  blog: initCommonState,
  blogDetail: undefined,
  status: null,
  error: undefined,
  createBlog: initCommonState,
  pagination: {
    totalPages: 0,
    totalElements: 0,
    currentPage: 0,
  },
  deleteBlog: initCommonState,
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    handleFetchBlogs(builder);
    handleFetchBlog(builder);
    handleCreateBlog(builder);
    handleUpdateBlog(builder);
    handleDeleteBlog(builder);
  },
});
export const { setPage } = blogSlice.actions;

export default blogSlice.reducer;
