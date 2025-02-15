import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { CateState } from '../cateSlice';
import { updateCate } from '../cateAction';

const handleUpdateCate = (builder: ActionReducerMapBuilder<CateState>) => {
    builder
        .addCase(updateCate.pending, (state) => {
            state.updateCateState.status = 'loading';
        })
        .addCase(updateCate.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.updateCateState.status = 'failed';
                state.updateCateState.errors = action.payload.error.errors
                console.log(action.payload.error);
            } else {
                state.updateCateState.status = 'succeeded';
                state.updateCateState.data  = action.payload.data;
                
            }
        })
        .addCase(updateCate.rejected, (state, action) => {
            state.updateCateState.status = 'failed';
            state.updateCateState.error = action.error.message;
        });
};

export default handleUpdateCate;
