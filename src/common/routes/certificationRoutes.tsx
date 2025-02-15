import { Outlet, RouteObject } from 'react-router-dom';
import React from 'react';
import { certificationDetailRoute } from '../../features/course/certification/presentation/index';

export const certificationRoutes: RouteObject = {
    path: '',
    element: <><Outlet /></>,
    children: [certificationDetailRoute()],
};
