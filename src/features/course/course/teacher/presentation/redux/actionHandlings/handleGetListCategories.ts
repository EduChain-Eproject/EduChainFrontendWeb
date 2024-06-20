import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { CourseState } from '../courseSlice';
import { fetchListCategories } from '../courseActions';

const handleGetListCategories = (builder: ActionReducerMapBuilder<CourseState>) => {
    builder
        .addCase(fetchListCategories.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchListCategories.fulfilled, (state, action) => {
            console.log(action.payload.data);

            if (action.payload.error) {
                state.status = 'failed';
                state.error = action.payload.error;
            } else {
                state.status = 'succeeded';
                state.categories = action.payload.data;
            }
        })
        .addCase(fetchListCategories.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
};

export default handleGetListCategories;
