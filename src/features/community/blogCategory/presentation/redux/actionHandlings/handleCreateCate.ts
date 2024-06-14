import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { CateState } from '../cateSlice';
import { createCate } from '../cateAction';

const handleCreateCate = (builder: ActionReducerMapBuilder<CateState>) => {
    builder
        .addCase(createCate.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(createCate.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.status = 'failed';
                state.error = action.payload.error;console.log(action.payload.error);
                

            } else {
                state.status = 'succeeded';
                action.payload.data && state.cates?.push(action.payload.data);
            }
        })
        .addCase(createCate.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
};

export default handleCreateCate;
