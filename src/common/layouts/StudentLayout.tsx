import React, { ReactNode, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getUserAction } from '../../features/auth/presentation/redux/AuthAction';

import { Footer } from '../components/Footer';
import { HomeHeader } from '../components/Header/HomeHeader';
import { useAppDispatch, useAppSelector } from '../context/store';
import RoleCheckerHOC from '../hoc/RoleCheckerHOC';

const StudentLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserAction());
  }, [dispatch, navigate]);

  useEffect(() => {
    switch (user?.role) {
      case 'ADMIN':
        navigate(`/dashboard`);
        break;
      case 'TEACHER':
        navigate(`/dashboard/teacher`);
        break;
      case 'CENSOR':
        navigate(`/dashboard/censor`);
        break;
      default:
        break;
    }
  }, [user]);

  return (
    <div>
      <HomeHeader title="educhain" />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RoleCheckerHOC(StudentLayout, 'STUDENT');
