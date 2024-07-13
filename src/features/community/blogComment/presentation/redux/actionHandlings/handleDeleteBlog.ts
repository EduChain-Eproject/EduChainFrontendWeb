import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { BlogState } from '../blogSlice';
import { deleteBlog } from '../blogActions';

const handleDeleteBlog = (builder: ActionReducerMapBuilder<BlogState>) => {
    builder
        .addCase(deleteBlog.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(deleteBlog.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.status = 'failed';
                state.error = action.payload.error;
            } else {
                state.status = 'succeeded';
                state.blogs = state.blogs?.filter(course => course.id !== action.meta.arg);
            }
        })
        .addCase(deleteBlog.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
};

export default handleDeleteBlog;
