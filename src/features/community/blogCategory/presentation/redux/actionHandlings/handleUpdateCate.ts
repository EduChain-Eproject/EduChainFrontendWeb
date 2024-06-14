import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { CateState } from '../cateSlice';
import { updateCate } from '../cateAction';

const handleUpdateCate = (builder: ActionReducerMapBuilder<CateState>) => {
    builder
        .addCase(updateCate.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(updateCate.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.status = 'failed';
                state.error = action.payload.error;
            } else {
                state.status = 'succeeded';
                const updatedCourse = action.payload.data;
                const index = state.cates?.findIndex(course => course.id === updatedCourse?.id);
                if (index !== undefined && index !== -1 && updatedCourse != undefined && state.cates != undefined) {
                    state.cates[index] = updatedCourse;
                }
            }
        })
        .addCase(updateCate.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
};

export default handleUpdateCate;
