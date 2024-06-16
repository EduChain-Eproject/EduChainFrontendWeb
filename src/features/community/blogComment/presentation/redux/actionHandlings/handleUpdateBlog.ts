import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { BlogState } from '../blogSlice';
import { updateBlog } from '../blogActions';

const handleUpdateBlog = (builder: ActionReducerMapBuilder<BlogState>) => {
    builder
        .addCase(updateBlog.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(updateBlog.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.status = 'failed';
                state.error = action.payload.error;
            } else {
                state.status = 'succeeded';
                const updatedCourse = action.payload.data;
                const index = state.blogs?.findIndex(course => course.id === updatedCourse?.id);
                if (index !== undefined && index !== -1 && updatedCourse != undefined && state.blogs != undefined) {
                    state.blogs[index] = updatedCourse;
                }
            }
        })
        .addCase(updateBlog.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
};

export default handleUpdateBlog;
