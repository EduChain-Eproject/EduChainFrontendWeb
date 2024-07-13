import React from "react"
import { RouteObject } from "react-router-dom"
import { ErrorPage } from "../pages"
import { GetUserIterestRoute } from "../../features/user_interest/presentation/page"
import { UserProfileLayout } from "../layouts"

export const userInterestRoutes : RouteObject = {
    path: "user-interest",
    element:<UserProfileLayout/>,
    errorElement: <ErrorPage/>,
    children: [
        GetUserIterestRoute()  
    ],
}
