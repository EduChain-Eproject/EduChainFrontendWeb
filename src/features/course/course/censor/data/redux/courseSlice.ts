import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Course from '../../../../../../common/entities/Course';
import { Page } from '../../../../../../common/entities/Page';
import { CommonState } from '../../../../../../common/state';
import handleChangeCourseStatus from '../services/handleChangeCourseStatus';
import handleFetchCourseDetail from '../services/handleFetchCourseDetail';
import handleGetCourseByStatus from '../services/handleGetCourseByStatus';

export interface CourseState {
  courseDetailPage: CommonState<Course>;
  listCoursesPage: CommonState<Page<Course>>;
  changeStatusOfCoursePage: CommonState<Course>;
}

const initCommonState = {
  data: undefined,
  status: null,
  error: undefined,
};

const initialState: CourseState = {
  courseDetailPage: initCommonState,
  listCoursesPage: initCommonState,
  changeStatusOfCoursePage: initCommonState,
};

const censorCourseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleFetchCourseDetail(builder);
    handleChangeCourseStatus(builder);
    handleGetCourseByStatus(builder);
  },
});

export default censorCourseSlice.reducer;
