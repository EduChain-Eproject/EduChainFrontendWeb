import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { BlogState } from "../blogSlice";
import { fetchBlogs } from "../blogActions";

const handleFetchBlogs = (builder: ActionReducerMapBuilder<BlogState>) => {
    builder
        .addCase(fetchBlogs.pending, (state) => {
            state.blogs.status = 'loading';
        })
        .addCase(fetchBlogs.fulfilled, (state, action) => {
            if (action.payload.error) { 
                state.blogs.status  = 'failed';
                state.blogs.error = action.payload.error.message;
            } else {
                state.status = 'succeeded';
                state.blogs.data = action.payload.data;    
                state.pagination.totalPages = action.payload.totalPages;
                state.pagination.totalElements = action.payload.totalElements;    
                console.log( state.blogs.data);
            }
        })
        .addCase(fetchBlogs.rejected, (state, action) => {
            state.blogs.status = 'failed';
            state.error = action.error.message;
        });
};

export default handleFetchBlogs;