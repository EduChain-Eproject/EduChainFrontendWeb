import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { fetchCate } from '../cateAction';
import { CateState } from '../cateSlice';

const handleFetchCate = (builder: ActionReducerMapBuilder<CateState>) => {
  builder
    .addCase(fetchCate.pending, (state) => {
      state.fetchCateState.status = 'loading';
    })
    .addCase(fetchCate.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.fetchCateState.status = 'failed';
        state.fetchCateState.errors = action.payload.error.errors;
      } else {
        state.fetchCateState.status = 'succeeded';
        state.fetchCateState.data = action.payload.data;
      }
    })
    .addCase(fetchCate.rejected, (state, action) => {
      state.fetchCateState.status = 'failed';
      state.fetchCateState.error = action.error.message;
    });
};

export default handleFetchCate;
