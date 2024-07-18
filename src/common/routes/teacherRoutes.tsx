import { RouteObject } from 'react-router-dom';
import { DashboardTeacherLayout } from '../layouts';
import { ErrorPage } from '../pages';
import React from 'react';
import {
  createCourseRoute,
  getCourseDetailRoute,
  getCoursesRoute,
  updateCourseRoute,
} from '../../features/course/course/teacher/presentation/pages/index';
import {
  creatChapterRoute,
  getChapterDetailRoute,
  updateChapterRoute,
} from '../../features/course/chapter/teacher/presentation/pages';
import {
  createLessonRoute,
  getLessonDetailRoute,
  updateLessonRoute,
} from '../../features/course/lesson/teacher/presentation/pages';
import {
  homeworkCreatePageRoute,
  homeworkDetailPageRoute,
  homeworkUpdatePageRoute,
} from '../../features/course/homework/teacher/presentation/pages';
import {
  questionCreatePageRoute,
  questionUpdatePageRoute,
} from '../../features/course/question/teacher/presentation/pages';

export const teacherRoutes: RouteObject = {
  path: 'dashboard/teacher',
  element: <DashboardTeacherLayout />,
  errorElement: <ErrorPage />,
  children: [
    getCoursesRoute(),
    getCourseDetailRoute(),
    createCourseRoute(),
    updateCourseRoute(),

    // chapters
    getChapterDetailRoute(),
    updateChapterRoute(),
    creatChapterRoute(),

    // lessons
    getLessonDetailRoute(),
    updateLessonRoute(),
    createLessonRoute(),

    // homeworks
    homeworkCreatePageRoute(),
    homeworkUpdatePageRoute(),
    homeworkDetailPageRoute(),

    // questions
    questionCreatePageRoute(),
    questionUpdatePageRoute(),
  ],
};
