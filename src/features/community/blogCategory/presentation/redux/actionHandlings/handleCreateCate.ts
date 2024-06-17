import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { CateState } from '../cateSlice';
import { createCate } from '../cateAction';

const handleCreateCate = (builder: ActionReducerMapBuilder<CateState>) => {
    builder
        .addCase(createCate.pending, (state) => {
            state.status = 'loading';
            state.errorCreate = undefined;
        })
        .addCase(createCate.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.status = 'failed';
                state.errorCreate = action.payload.error;
                console.log(action.payload.error);
                
            } else {
                state.status = 'succeeded';
                state.errorCreate = "";
                action.payload.data && state.cates?.push(action.payload.data);
            }
        })
        .addCase(createCate.rejected, (state, action) => {
            state.status = 'failed';
            state.errorCreate = action.error.message;
        });
};

export default handleCreateCate;
