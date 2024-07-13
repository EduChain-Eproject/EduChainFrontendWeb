import React, { ReactNode, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { getUserAction } from '../../features/auth/presentation/redux/AuthAction';
import { useAppDispatch, useAppSelector } from '../context/store';
import RoleCheckerHOC from '../hoc/RoleCheckerHOC';

const UserProfileLayout = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  
  const {isAuthenticated, user} = useAppSelector(state => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserAction());
    } else {
      navigate('/Auth')
    }
  }, [isAuthenticated]);

    return (
      <div>
        <Outlet />
      </div>
    );
  };

  export default UserProfileLayout;