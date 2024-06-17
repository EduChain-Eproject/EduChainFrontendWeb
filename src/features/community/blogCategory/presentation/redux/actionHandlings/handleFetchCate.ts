import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { CateState } from '../cateSlice';
import { fetchCate } from '../cateAction';

const handleFetchCate = (builder: ActionReducerMapBuilder<CateState>) => {
    builder
        .addCase(fetchCate.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchCate.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.status = 'failed';
                state.errorFetchCate = action.payload.error;
            } else {
                state.status = 'succeeded';
                state.cate = action.payload.data;
            }
        })
        .addCase(fetchCate.rejected, (state, action) => {
            state.status = 'failed';
            state.errorFetchCate = action.error.message;
        });
};

export default handleFetchCate;
