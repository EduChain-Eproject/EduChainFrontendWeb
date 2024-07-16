import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { CourseState } from '../courseSlice';
import { fetchListCategories } from '../courseActions';

const handleGetListCategories = (builder: ActionReducerMapBuilder<CourseState>) => {
    builder
        .addCase(fetchListCategories.pending, (state) => {
            state.listCoursesPage.status = 'loading';
        })
        .addCase(fetchListCategories.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.listCoursesPage.status = 'failed';
                state.listCoursesPage.error = action.payload.error;
            } else {
                state.listCoursesPage.status = 'get list succeeded';
                if (state.listCoursesPage.data) {
                    state.listCoursesPage.data.categories = action.payload.data;
                }
            }
        })
        .addCase(fetchListCategories.rejected, (state, action) => {
            state.listCoursesPage.status = 'failed';
            state.listCoursesPage.error = action.error.message;
        });
};

export default handleGetListCategories;
