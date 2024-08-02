import { RouteObject, createBrowserRouter } from 'react-router-dom';
import React from 'react';
import { UnauthorizedPage } from './common/pages';
import {
  adminRoutes,
  authRoute,
  censorRoutes,
  teacherRoutes,
  homeRoutes,
  studentRoutes,
  userProfileRoutes,
  userCourseRoute,
} from './common/routes';
const unauthorizedRoute: RouteObject = {
  path: 'unauthorized',
  element: <UnauthorizedPage />,
};

export const router = createBrowserRouter([
  authRoute,
  homeRoutes,
  studentRoutes,
  adminRoutes,
  censorRoutes,
  teacherRoutes,
  userProfileRoutes,
  unauthorizedRoute,
  userCourseRoute,
]);
