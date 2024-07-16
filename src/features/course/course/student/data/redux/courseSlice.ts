import { createSlice } from '@reduxjs/toolkit';
import Category from '../../../../../../common/entities/Category';
import Course from '../../../../../../common/entities/Course';
import Lesson from '../../../../../../common/entities/Lesson';
import { Page } from '../../../../../../common/entities/Page';
import {
  CommonState,
  initCommonState,
} from '../../../../../../common/state/index';
import handleEnrollACourse from '../services/handleEnrollACourse';
import handleGetCourseDetail from '../services/handleGetCourseDetail';
import handleGetLessonDetail from '../services/handleGetLessonDetail';
import handleGetListCategories from '../services/handleGetListCategories';
import handleGetListCourses from '../services/handleGetListCourses';

export interface ListCoursesPage {
  courses?: Page<Course>;
  categories?: Category[];
}

export interface CourseState {
  listCoursesPage: CommonState<ListCoursesPage>;
  courseDetailPage: CommonState<Course>;
  lessonDetailPage: CommonState<Lesson>;
}

const initialState: CourseState = {
  listCoursesPage: {
    ...initCommonState,
    data: {
      categories: [],
      courses: undefined,
    },
  },
  courseDetailPage: initCommonState,
  lessonDetailPage: initCommonState,
};

const studentCourseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleGetListCourses(builder);
    handleGetListCategories(builder);
    handleGetCourseDetail(builder);
    handleGetLessonDetail(builder);
    handleEnrollACourse(builder);
  },
});

export default studentCourseSlice.reducer;
