import React, { useState, ReactNode } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
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

const ProtectedLayout = RoleCheckerHOC(HomeLayout, "USER");

export default ProtectedLayout;
