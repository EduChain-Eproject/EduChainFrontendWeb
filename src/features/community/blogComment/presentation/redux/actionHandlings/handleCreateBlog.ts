import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { BlogState } from '../blogSlice';
import { createBlog } from '../blogActions';

const handleCreateBlog = (builder: ActionReducerMapBuilder<BlogState>) => {
    builder
        .addCase(createBlog.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(createBlog.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.status = 'failed';
                state.error = action.payload.error;
            } else {
                state.status = 'succeeded';
                action.payload.data && state.blogs?.push(action.payload.data);
            }
        })
        .addCase(createBlog.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
};

export default handleCreateBlog;
