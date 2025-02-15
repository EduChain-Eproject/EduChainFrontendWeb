import {
  CommonState,
  initCommonState,
} from './../../../../../common/state/index';
import { createSlice } from '@reduxjs/toolkit';
import { BlogCategory } from '../../domain/entities/BlogCategory';
import {
  handleCreateCate,
  handleDeleteCate,
  handleFetchCate,
  handleFetchCates,
  handleUpdateCate,
} from './actionHandlings';

export interface CateState {
  fetchCatesState: CommonState<BlogCategory[]>;
  createCateState: CommonState<BlogCategory>;
  updateCateState: CommonState<BlogCategory>;
  fetchCateState: CommonState<BlogCategory>;
}
const initialState: CateState = {
  fetchCatesState: initCommonState,
  updateCateState: initCommonState,
  createCateState: initCommonState,
  fetchCateState: initCommonState,
};

const cateSlice = createSlice({
  name: 'cates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleCreateCate(builder);
    handleUpdateCate(builder);
    handleFetchCates(builder);
    handleFetchCate(builder);
    handleDeleteCate(builder);
  },
});

export default cateSlice.reducer;
