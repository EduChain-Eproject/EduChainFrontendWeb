import React, { useState, ReactNode, useEffect } from 'react';
import Header from '../components/Header/AdminHeader';
import Sidebar from '../components/Sidebar/AdminSidebar';
import { Outlet, useNavigate, useNavigation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../context/store';
import handleGetUser from '../../features/auth/presentation/redux/actionHandling/HandleGetUser';
import { getUserAction } from '../../features/auth/presentation/redux/AuthAction';

const AuthLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {isAuthenticated, user} = useAppSelector(state => state.auth)

  useEffect(() => {
    if(isAuthenticated){
      dispatch(getUserAction());
    }
  }, [isAuthenticated])

  useEffect(() => {
    console.log("role: "+user?.role);
    
    switch (user?.role) {
      case "ADMIN":
        navigate("/dashboard")
        break;
      case "STUDENT": 
        navigate(`/profile`)
        case "TEACHER":
        navigate(`/profile`)
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
