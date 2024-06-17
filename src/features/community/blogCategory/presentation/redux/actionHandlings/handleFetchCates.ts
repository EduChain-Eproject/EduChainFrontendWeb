import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { CateState } from '../cateSlice';
import { fetchCates } from '../cateAction';

const handleFetchCates = (builder: ActionReducerMapBuilder<CateState>) => {
    builder
        .addCase(fetchCates.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchCates.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.status = 'failed';
                state.errorFetchCates = action.payload.error;
            } else {
                state.status = 'succeeded';
                state.cates = action.payload.data;
            }
        })
        .addCase(fetchCates.rejected, (state, action) => {
            state.status = 'failed';
            state.errorFetchCates = action.error.message;
        });
};

export default handleFetchCates;