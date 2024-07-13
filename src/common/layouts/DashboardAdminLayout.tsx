import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { getUserAction } from '../../features/auth/presentation/redux/AuthAction';
import AdminHeader from '../components/Header/AdminHeader';
import Sidebar from '../components/Sidebar/AdminSidebar';
import { useAppDispatch, useAppSelector } from '../context/store';
import RoleCheckerHOC from '../hoc/RoleCheckerHOC';

const DashboardAdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserAction());
    } else {
      navigate('/Auth')
    }
  }, [isAuthenticated]);

  useEffect(() => {
    switch (user?.role) {
      case 'TEACHER':
        navigate(`/dashboard/teacher`);
        break;
      case 'CENSOR':
        navigate(`/dashboard/censor`);
        break;
      case 'STUDENT':
        navigate(`/`);
        break;
      default:
        break;
    }
  }, [user]);
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <AdminHeader
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

const ProtectedLayout = RoleCheckerHOC(DashboardAdminLayout, 'ADMIN');

export default ProtectedLayout;
