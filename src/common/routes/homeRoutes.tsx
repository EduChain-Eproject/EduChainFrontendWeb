import { RouteObject } from 'react-router-dom';
import React from 'react';
import { homepageRoute } from '../../features/homepage/presentation/pages';
import HomeLayout from '../layouts/HomeLayout';

export const homeRoutes: RouteObject = {
  path: '',
  element: <HomeLayout />,
  children: [homepageRoute()],
};
