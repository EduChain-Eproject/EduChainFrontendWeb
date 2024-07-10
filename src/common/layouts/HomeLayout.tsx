import React, { useState, ReactNode } from 'react';
import RoleCheckerHOC from '../hoc/RoleCheckerHOC';
import { HomeHeader } from '../components/Header/HomeHeader';
import { Footer } from '../components/Footer';

import { Outlet } from 'react-router-dom';

const HomeLayout: React.FC<{ children: ReactNode }> = ({ children }) => {

  return (
    <div>
      <HomeHeader title='educhain' />
      <Outlet />
      <Footer />
    </div>
  );
};

const ProtectedLayout = RoleCheckerHOC(HomeLayout, "STUDENT");

export default ProtectedLayout;
