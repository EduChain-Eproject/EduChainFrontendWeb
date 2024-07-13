import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../context/store';
import { getUserAction } from '../../features/auth/presentation/redux/AuthAction';

const AuthLayout = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isAuthenticated, user } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserAction());
    }
  }, [isAuthenticated])

  useEffect(() => {
    switch (user?.role) {
      case "ADMIN":
        navigate("/dashboard")
        break;
      case "TEACHER":
        navigate(`/dashboard/teacher`)
        break;
      case "CENSOR":
        navigate(`/dashboard/censor`)
        break;
      case "STUDENT":
        navigate(`/`)
        break;
      default:
        break;
    }
  }, [user])

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
