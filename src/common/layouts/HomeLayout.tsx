import React, { ReactNode, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getUserAction } from '../../features/auth/presentation/redux/AuthAction';

import { Footer } from '../components/Footer';
import { HomeHeader } from '../components/Header/HomeHeader';
import { useAppDispatch, useAppSelector } from '../context/store';
import RoleCheckerHOC from '../hoc/RoleCheckerHOC';

const HomeLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserAction());
  }, [dispatch, navigate]);

  return (
    <div>
      <HomeHeader title="educhain" />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomeLayout;
