import {
  CommonState,
  initCommonState,
} from '../../../../../common/state/index';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BlogComment } from '../../../../../common/entities/BlogComment';
import handleCreateComment from './actionHandlings/handleCreateComment';
import handleFetchBlogsComment from './actionHandlings/handleFetchBlogsComment';

export interface BlogCommentState {
  comment: CommonState<BlogComment>;
  createComment: CommonState<BlogComment>;
  updateComment: CommonState<BlogComment>;
  fetchComments: CommonState<BlogComment[]>;
  deleteComment: CommonState<BlogComment>;
}
const initialState: BlogCommentState = {
  comment: initCommonState,
  createComment: initCommonState,
  updateComment: initCommonState,
  fetchComments: initCommonState,
  deleteComment: initCommonState,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleCreateComment(builder);
    handleFetchBlogsComment(builder);
    // handleFetchBlog(builder);

    // handleUpdateBlog(builder);
    // handleDeleteBlog(builder);
  },
});

export default commentSlice.reducer;
