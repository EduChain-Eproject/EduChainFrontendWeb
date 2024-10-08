import { RouteObject } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import React from 'react';
import { getUserProfileRoute } from '../../features/userprofile/presentation/pages';
import { updateUserRoute } from '../../features/userprofile/presentation/pages';
import { UserProfileLayout } from '../layouts';
import { getUserIterestRoute } from '../../features/user_interest/presentation/page';

export const userProfileRoutes: RouteObject = {
  path: 'profile',
  // element: <UserProfileLayout />,
  element: <UserProfileLayout />,
  errorElement: <ErrorPage />,
  children: [getUserProfileRoute(), updateUserRoute(), getUserIterestRoute()],
};
