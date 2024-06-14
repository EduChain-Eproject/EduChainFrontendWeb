import { RouteObject, createBrowserRouter } from "react-router-dom";
import { AuthLayout, DashboardAdminLayout, DashboardCensorLayout, DashboardTeacherLayout, HomeUserLayout } from "./layouts";
import React from "react";
import { ErrorPage, UnauthorizedPage } from "./pages"
import SignIn from './temp_pages/Authentication/SignIn';
import SignUp from './temp_pages/Authentication/SignUp';
import Calendar from './temp_pages/Calendar';
import Chart from './temp_pages/Chart';
import FormElements from './temp_pages/Form/FormElements';
import FormLayout from './temp_pages/Form/FormLayout';
import Profile from './temp_pages/Profile';
import Settings from './temp_pages/Settings';
import Tables from './temp_pages/Tables';
import Alerts from './temp_pages/UiElements/Alerts';
import Buttons from './temp_pages/UiElements/Buttons';
import { dashboardRoute } from "../features/admin/presentation/pages";
import BlogPage from "../features/community/blog/presentation/pages/admin/BlogPage";
export const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <DashboardAdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      dashboardRoute(),
      {
        path: 'calendar',
        element: <Calendar />,
      },
      {
        path: 'chart',
        element: <Chart />,
      },
      {
        path: 'forms/form-elements',
        element: <FormElements />,
      },
      {
        path: 'forms/form-layout',
        element: <FormLayout />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'tables',
        element: <Tables />,
      },
      {
        path: 'ui/alerts',
        element: <Alerts />,
      },
      {
        path: 'ui/buttons',
        element: <Buttons />,
      },
      // {
      //   path: "/blog-list",
      //   element: <BlogPage />,
      // },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/auth/signup",
        element: <SignIn />,
      },
      {
        path: "/auth/signin",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "",
    element: <HomeUserLayout />,
  },
  {
    path: "dashboard/teacher",
    element: <DashboardTeacherLayout />,
    errorElement: <ErrorPage />,
  },
  {
    path: "dashboard/censor",
    element: <DashboardCensorLayout />,
    errorElement: <ErrorPage />,
  },
  {
    path: "unauthorized",
    element: <UnauthorizedPage />
  }
]);