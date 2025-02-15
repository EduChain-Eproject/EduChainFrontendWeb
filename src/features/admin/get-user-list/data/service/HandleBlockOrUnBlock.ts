import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import Failure from '../../../../../common/entities/Failure';
import axiosService from '../../../../../common/services/axiosService';
import { GetUserListState } from '../redux/GetUserListSlice';

export type BlockOrUnBlockReq = {
  userId: number;
  blockValue: boolean;
};
const baseUrl = 'http://localhost:8080/';
export const apiBlockOrUnBlock = async (
  req: BlockOrUnBlockReq,
): Promise<{
  content: boolean;
  error?: {
    message: string;
    errors: { [key: string]: string };
    timestamp?: string;
  };
}> => {
  try {
    const response = await axiosService.post(
      `${baseUrl}ADMIN/blockOrUnblock`,
      req,
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const data = error.response.data;
      const message = data.errors.message || 'Validation error';
      const errors = data.errors;

      throw new Failure(message, errors, data.timestamp);
    }
    throw new Failure('An unknown error occurred', {
      message: 'An unknown error occurred',
    });
  }
};

export const BlockOrUnBlockAction = createAsyncThunk(
  'admin/BlockOrUnBlockAction',
  async (req: BlockOrUnBlockReq) => {
    return await apiBlockOrUnBlock(req);
  },
);

const HandleBlockOrUnBlock = (
  builder: ActionReducerMapBuilder<GetUserListState>,
) => {
  builder
    .addCase(BlockOrUnBlockAction.pending, (state) => {
      state.blockResultState.status = 'loading';
    })
    .addCase(BlockOrUnBlockAction.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.blockResultState.status = 'failed';
        state.blockResultState.error = action.payload.error?.message;
        state.blockResultState.errors = action.payload.error?.errors;
      } else {
        state.blockResultState.status = 'succeeded';
        if (state.blockResultState.data !== null) {
          state.blockResultState.data = action.payload.content;
          console.log(state.blockResultState.data);
        }
      }
    })
    .addCase(BlockOrUnBlockAction.rejected, (state, action) => {
      state.blockResultState.status = 'failed';
      state.blockResultState.error = action.error.message;
    });
};
export default HandleBlockOrUnBlock;
