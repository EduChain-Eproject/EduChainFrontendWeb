import { RouteObject } from 'react-router-dom';
import React, { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../common/context/store';
import { getUserProfileAction } from '../redux/UserProfileAction';
import UserProfileComp from '../components/UserProfileComp';

export const route: () => RouteObject = () => {
  return {
    path: '',
    element: <GetUserProfilePage />,
  };
};

const GetUserProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error, status } = useAppSelector(
    (state) => state.userProfile.profilePage,
  );
  const email = useAppSelector((s) => s.auth.user?.email);

  useEffect(() => {
    if (email) {


      dispatch(getUserProfileAction(email));
    }
  }, [dispatch, email]);

  if (status === 'loading') {
    return <div>Loading</div>;
  }

  if (status === 'failed') {
    return<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <span className="block sm:inline">{error}</span>
  </div>;
  }

  console.log('profile');

  return (
    <div>
      <UserProfileComp />
    </div>
  );
};

export default GetUserProfilePage;
