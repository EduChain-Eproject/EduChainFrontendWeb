import { createSlice } from '@reduxjs/toolkit';
import { Award } from '../../../../../../common/entities/Award';
import Category from '../../../../../../common/entities/Category';
import Course from '../../../../../../common/entities/Course';
import Homework from '../../../../../../common/entities/Homework';
import Lesson from '../../../../../../common/entities/Lesson';
import { Page } from '../../../../../../common/entities/Page';
import { UserHomework } from '../../../../../../common/entities/UserHomework';
import {
  CommonState,
  initCommonState,
} from '../../../../../../common/state/index';
import handleAnswerAQuestion from '../services/handleAnswerAQuestion';
import handleEnrollACourse from '../services/handleEnrollACourse';
import handleGetCourseDetail from '../services/handleGetCourseDetail';
import handleGetHomeworkDetail from '../services/handleGetHomeworkDetail';
import handleGetLessonDetail from '../services/handleGetLessonDetail';
import handleGetListCategories from '../services/handleGetListCategories';
import handleGetListCourses from '../services/handleGetListCourses';
import handleReceiveAward from '../services/handleReceiveAward';
import handleSubmitHomework from '../services/handleSubmitHomework';

export interface ListCoursesPage {
  courses?: Page<Course>;
  categories?: Category[];
}

export interface CourseState {
  listCoursesPage: CommonState<ListCoursesPage>;
  courseDetailPage: CommonState<Course>;
  lessonDetailPage: CommonState<Lesson>;
  homeworkDetailComponent: CommonState<Homework>;
  userHomeworkComponent: CommonState<UserHomework>;
  userAwardComponent: CommonState<Award>;
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
  homeworkDetailComponent: initCommonState,
  userHomeworkComponent: initCommonState,
  userAwardComponent: initCommonState,
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
    handleGetHomeworkDetail(builder);
    handleAnswerAQuestion(builder);
    handleSubmitHomework(builder);
    handleReceiveAward(builder);
  },
});

export default studentCourseSlice.reducer;
