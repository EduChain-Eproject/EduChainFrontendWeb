import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { CourseState } from "../courseSlice";
import { fetchCourses } from "../courseActions";

const handleFetchCourses = (builder: ActionReducerMapBuilder<CourseState>) => {
    builder
        .addCase(fetchCourses.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchCourses.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.status = 'failed';
                state.error = action.payload.error;
            } else {
                state.status = 'succeeded';
                state.courses = action.payload.data;
            }
        })
        .addCase(fetchCourses.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
};

export default handleFetchCourses;