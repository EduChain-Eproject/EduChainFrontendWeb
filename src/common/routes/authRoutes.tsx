import { Navigate, RouteObject, useParams } from 'react-router-dom';
import { AuthLayout } from '../layouts';
import React from 'react';
import { ErrorPage } from '../pages';
import {
  loginRoute,
  registerRoute,
  resetPasswordRoute,
} from '../../features/auth/presentation/pages';

export const authRoute: RouteObject = {
  path: 'Auth',
  element: <AuthLayout />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: '',
      element: <Navigate to={'login'} />,
    },
    loginRoute(),
    registerRoute(),
    resetPasswordRoute(),
  ],
};
