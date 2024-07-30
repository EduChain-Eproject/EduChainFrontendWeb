import { createSlice } from '@reduxjs/toolkit';
import Category from '../../../../../../common/entities/Category';
import Course from '../../../../../../common/entities/Course';

import { CommonState, initCommonState } from '../../../../../../common/state';
import handleCreateCourse from '../services/handleCreateCourse';
import handleFetchCourseDetail from '../services/handleFetchCourseDetail';
import handleGetCourseByTeacher from '../services/handleGetCourseByTeacher';
import handleGetListCategories from '../services/handleGetListCategories';
import handleUpdateCourse from '../services/handleUpdateCourse';
import handleDeactivateCourse from '../services/handleDeactivateCourse';

export interface CourseState {
  createCoursePage: CommonState<Category[]>;
  updateCoursePage: CommonState<Category[]>;
  courseDetailPage: CommonState<Course>;
  listCoursesPage: CommonState<Course[]>;
  deactivateCoursePage: CommonState<Course>;
}

const initialState: CourseState = {
  courseDetailPage: initCommonState,
  createCoursePage: initCommonState,
  listCoursesPage: initCommonState,
  deactivateCoursePage: initCommonState,
  updateCoursePage: initCommonState,
};

const teacherCourseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    clearErrorStatus(state, action) {
      if (action.payload == 'createCoursePage') {
        state.createCoursePage.status = null;
        state.createCoursePage.error = undefined;
      }
    },
    courseChaperDeleted(state, action) {
      const deletedChapterId = action.payload;
      if (state.courseDetailPage.data?.chapterDtos) {
        const filteredChapters = state.courseDetailPage.data.chapterDtos.filter(
          (ch) => ch.id !== deletedChapterId,
        );
        state.courseDetailPage.data = {
          ...state.courseDetailPage.data,
          chapterDtos: filteredChapters,
        };
      }
    },
  },
  extraReducers: (builder) => {
    handleFetchCourseDetail(builder);
    handleCreateCourse(builder);
    handleUpdateCourse(builder);
    handleDeactivateCourse(builder);
    handleGetListCategories(builder);
    handleGetCourseByTeacher(builder);
  },
});

export const { clearErrorStatus, courseChaperDeleted } =
  teacherCourseSlice.actions;
export default teacherCourseSlice.reducer;
