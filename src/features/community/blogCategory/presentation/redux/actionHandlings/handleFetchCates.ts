import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { CateState } from '../cateSlice';
import { fetchCates } from '../cateAction';

const handleFetchCates = (builder: ActionReducerMapBuilder<CateState>) => {
    builder
        .addCase(fetchCates.pending, (state) => {
            state.fetchCatesState.status = 'loading';
        })
        .addCase(fetchCates.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.fetchCatesState.status = 'fail';
                state.fetchCatesState.error = action.payload.error.message;
            } else {
                state.fetchCatesState.status = 'succeeded';
                state.fetchCatesState.data = action.payload.data;
                console.log(state.fetchCatesState.data);
            }
        })
        .addCase(fetchCates.rejected, (state, action) => {
            state.fetchCatesState.status = 'failed';
            state.fetchCatesState.error = action.error.message;
        });
};

export default handleFetchCates;