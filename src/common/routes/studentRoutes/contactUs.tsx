import { Outlet, RouteObject } from 'react-router-dom';
import React from 'react';
import {
  contactRoute
} from '../../../features/front-end/contactus/index';

export const contactRoutes: RouteObject = {
  path: 'contact_us',
  element: (
    <>
      <Outlet />
    </>
  ),
  children: [
    contactRoute(),
  ],
};
