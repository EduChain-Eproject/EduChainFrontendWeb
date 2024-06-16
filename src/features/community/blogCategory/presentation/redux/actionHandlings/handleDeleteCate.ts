import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { CateState } from '../cateSlice';
import { deleteCate } from '../cateAction';

const handleDeleteCate = (builder: ActionReducerMapBuilder<CateState>) => {
    builder
        .addCase(deleteCate.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(deleteCate.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.status = 'failed';
                state.error = action.payload.error;
            } else {
                state.status = 'succeeded';
                state.cates = state.cates?.filter(course => course.id !== action.meta.arg);
            }
        })
        .addCase(deleteCate.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
};

export default handleDeleteCate;
