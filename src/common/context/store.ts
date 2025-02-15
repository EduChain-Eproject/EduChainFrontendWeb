import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import authReducer from '../../features/auth/presentation/redux/authSlice';

import teacherCourseSlice from '../../features/course/course/teacher/data/redux/courseSlice';
import teacherChapterSlice from '../../features/course/chapter/teacher/data/redux/chapterSlice';
import teacherLessonSlice from '../../features/course/lesson/teacher/data/redux/lessonSlice';

import studentCourseSlice from '../../features/course/course/student/data/redux/courseSlice';

import censorCourseSlice from '../../features/course/course/censor/data/redux/courseSlice';

import blogSlice from '../../features/community/blog/presentation/redux/blogSlice';
import blogUiSlice from '../../features/front-end/blogs/data/redux/blogUISlice';
import cateSlice from '../../features/community/blogCategory/presentation/redux/cateSlice';
import homeSlice from '../../features/homepage/data/redux/homeSlice';

import UserProfileSlice from '../../features/userprofile/presentation/redux/UserProfileSlice';
import UserInterestSlice from '../../features/user_interest/presentation/redux/UserInterestSlice';
import UserCourseSlice from '../../features/user_course/presentation/redux/UserCourseSlice';

import teacherHomeworkSlice from '../../features/course/homework/teacher/data/redux/homeworkSlice';

import teacherQuestionSlice from '../../features/course/question/teacher/data/redux/questionSlice';
import UserHomeworkSlice from '../../features/user_homework/presentation/redux/UserHomeworkForProfileSlice';
import UserHomeworkForProfileSlice from '../../features/user_homework/presentation/redux/UserHomeworkForProfileSlice';

import orderAdminSlice from '../../features/admin/order/data/redux/orderAdminSlice'
import GetUserListSlice from '../../features/admin/get-user-list/data/redux/GetUserListSlice';
import commentSlice from '../../features/community/blogComment/presentation/redux/BlogCommentSlice';

const courses = combineReducers({
  teacher: teacherCourseSlice,
  censor: censorCourseSlice,
  student: studentCourseSlice,
});

const chapters = combineReducers({
  teacher: teacherChapterSlice,
});

const lessons = combineReducers({
  teacher: teacherLessonSlice,
});

const homeworks = combineReducers({
  teacher: teacherHomeworkSlice,
});

const questions = combineReducers({
  teacher: teacherQuestionSlice,
});

const rootReducer = combineReducers({
  home: homeSlice,
  auth: authReducer,
  courses: courses,
  blogs: blogSlice,
  cates: cateSlice,
  chapters,
  lessons,
  blogUiSlice,
  userProfile: UserProfileSlice,
  userInterest: UserInterestSlice,
  userCourse: UserCourseSlice,
  userhomeworkForPrile: UserHomeworkForProfileSlice,
  homeworks,
  questions,
  orderAdminSlice,
  getUserList: GetUserListSlice,
  commnent: commentSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
