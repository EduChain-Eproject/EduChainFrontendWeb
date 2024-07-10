import { RouteObject, createBrowserRouter } from "react-router-dom";
import React from "react";
import { UnauthorizedPage } from "./common/pages"
import { adminRoutes, authRoute, censorRoutes, teacherRoutes, homeRoutes, userProfileRoutes, userInterestRoutes } from "./common/routes";
import { updateUserProfileRoutes } from "./common/routes/userProfileRoutes";

const unauthorizedRoute: RouteObject = {
  path: "unauthorized",
  element: <UnauthorizedPage />
}

export const router = createBrowserRouter([
  authRoute,
  homeRoutes,
  adminRoutes,
  censorRoutes,
  teacherRoutes,
  userProfileRoutes,
  unauthorizedRoute,
  updateUserProfileRoutes,
  userInterestRoutes 
]);

