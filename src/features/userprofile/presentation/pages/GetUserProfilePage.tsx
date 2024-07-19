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
      console.log(email);

      dispatch(getUserProfileAction(email));
    }
  }, [dispatch, email]);

  if (status === 'loading') {
    return <div>Loading</div>;
  }

  if (status === 'failed') {
    return <div>error:{error}</div>;
  }

  console.log('profile');

  return (
    <div>
      <UserProfileComp />
    </div>
  );
};

export default GetUserProfilePage;
