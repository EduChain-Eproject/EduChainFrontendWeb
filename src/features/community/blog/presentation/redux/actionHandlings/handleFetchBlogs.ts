import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { BlogState } from "../blogSlice";
import { fetchBlogs } from "../blogActions";

const handleFetchBlogs = (builder: ActionReducerMapBuilder<BlogState>) => {
    builder
        .addCase(fetchBlogs.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchBlogs.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.status = 'failed';
                state.error = action.payload.error;
            } else {
                state.status = 'succeeded';
                state.blogs = action.payload.data;
            }
        })
        .addCase(fetchBlogs.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
};

export default handleFetchBlogs;