import React, { ReactNode, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Footer } from '../components/Footer';
import { HomeHeader } from '../components/Header/HomeHeader';
import { useAppSelector } from '../context/store';
import RoleCheckerHOC from '../hoc/RoleCheckerHOC';

const HomeLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

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

const ProtectedLayout = RoleCheckerHOC(HomeLayout, 'STUDENT');

export default ProtectedLayout;
