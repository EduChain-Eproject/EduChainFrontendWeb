import React, { ReactNode, useEffect } from "react";
import RoleCheckerHOC from "../hoc/RoleCheckerHOC";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../context/store";
import { getUserAction } from "../../features/auth/presentation/redux/AuthAction";

const UserProfileLayout = () => {
  const {isAuthenticated, user} = useAppSelector(state => state.auth)
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if(isAuthenticated){
      dispatch(getUserAction());
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/Auth')
    }
  }, [user])

    return (
      <div>
        <Outlet />
      </div>
    );
  };

  export default UserProfileLayout;