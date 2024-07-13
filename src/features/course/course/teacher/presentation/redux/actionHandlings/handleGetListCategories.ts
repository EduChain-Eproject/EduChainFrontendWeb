import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { CourseState } from '../courseSlice';
import { fetchListCategories } from '../courseActions';

const handleGetListCategories = (builder: ActionReducerMapBuilder<CourseState>) => {
    builder
        .addCase(fetchListCategories.pending, (state) => {
            state.createCoursePage.status = 'loading';
        })
        .addCase(fetchListCategories.fulfilled, (state, action) => {
            console.log(action.payload.data);

            if (action.payload.error) {
                state.createCoursePage.status = 'failed';
                state.createCoursePage.error = action.payload.error;
            } else {
                state.createCoursePage.status = 'get list succeeded';
                state.createCoursePage.data = action.payload.data;
            }
        })
        .addCase(fetchListCategories.rejected, (state, action) => {
            state.createCoursePage.status = 'failed';
            state.createCoursePage.error = action.error.message;
        });
};

export default handleGetListCategories;
