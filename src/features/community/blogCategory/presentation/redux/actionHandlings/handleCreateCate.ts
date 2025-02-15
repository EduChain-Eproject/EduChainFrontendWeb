import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { CateState } from '../cateSlice';
import { createCate, resetCreateCateAction } from '../cateAction';

const handleCreateCate = (builder: ActionReducerMapBuilder<CateState>) => {
  builder
    .addCase(createCate.pending, (state) => {
      state.createCateState.status = 'loading';
    })
    .addCase(createCate.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.createCateState.status = 'failed';
        state.createCateState.errors = action.payload.error.errors;
        state.createCateState.error = action.payload.error.message;
      } else {
        state.createCateState.status = 'succeeded';
        state.createCateState.data = action.payload.data;
      }
    })
    .addCase(createCate.rejected, (state, action) => {
      state.createCateState.status = 'failed';
      state.createCateState.error = action.error.message;
    })
    .addCase(resetCreateCateAction, (state) => {
      state.createCateState = {
        status: 'idle',
        data: undefined,
        error: undefined,
        errors: undefined,
      };
    });
};

export default handleCreateCate;
