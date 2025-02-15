import React, { ComponentType, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../context/store';
import { Navigate, useNavigate } from 'react-router-dom';
import { getUserAction } from '../../features/auth/presentation/redux/AuthAction';

const RoleCheckerHOC = <P extends object>(
  WrappedComponent: ComponentType<P>,
  requiredRole: string,
) => {
  const RoleChecker: React.FC<P> = (props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/Auth/login');
      } else {
        dispatch(getUserAction());
      }
    }, [isAuthenticated, dispatch, navigate]);

    useEffect(() => {
      if (user?.role && user.role !== requiredRole && requiredRole !== 'NONE') {
        switch (user.role) {
          case 'ADMIN':
            navigate('/dashboard');
            break;
          case 'TEACHER':
            navigate('/dashboard/teacher/courses');
            break;
          case 'CENSOR':
            navigate('/dashboard/censor');
            break;
          case 'STUDENT':
            navigate('/');
            break;
          default:
            break;
        }
      }
    }, [user?.role, navigate, requiredRole]);

    return <WrappedComponent {...props} />;
  };

  return RoleChecker;
};

export default RoleCheckerHOC;
