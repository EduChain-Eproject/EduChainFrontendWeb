import { RouteObject } from 'react-router-dom';
import React from 'react';
import { StudentLayout } from '../../layouts';
import { courseRoutes } from './courseRoutes';
import { communityRoutes } from './communityRoutes';
import { homepageRoute } from '../../../features/homepage/presentation/pages';
import { contactRoutes } from './contactUs';

export const studentRoutes: RouteObject = {
  path: '',
  element: <StudentLayout />,
  children: [courseRoutes, communityRoutes, contactRoutes],
};
