import React, { useState, ReactNode } from 'react';
import RoleCheckerHOC from '../hoc/RoleCheckerHOC';
import { HomeHeader } from '../components/Header/HomeHeader';
import { Footer } from '../components/Footer';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {

  return (
    <div>
      <HomeHeader title='educhain' />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomeLayout;
