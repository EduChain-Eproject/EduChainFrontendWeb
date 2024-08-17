import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { BlogState } from '../blogSlice';
import { deleteBlog } from '../blogActions';

const handleDeleteBlog = (builder: ActionReducerMapBuilder<BlogState>) => {
    builder
        .addCase(deleteBlog.pending, (state) => {
            state.deleteBlog.status = 'loading';
        })
        .addCase(deleteBlog.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.deleteBlog.status  = 'failed';
                state.deleteBlog.error = action.payload.error;
            } else {
                state.deleteBlog.status  = 'succeeded';

            }
        })
        .addCase(deleteBlog.rejected, (state, action) => {
            state.deleteBlog.status  = 'failed';
            state.error = action.error.message;
        });
};

export default handleDeleteBlog;
