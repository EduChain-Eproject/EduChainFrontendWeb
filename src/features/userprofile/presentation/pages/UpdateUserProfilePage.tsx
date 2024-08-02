import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../common/context/store';
import UpdateUserProfileComp from '../components/UpdateUserProfileComp';
import { RouteObject, useNavigate } from 'react-router-dom';
import { getUserProfileAction, resetUpdateProfileStatus, updateUserProfileAction } from '../redux/UserProfileAction';
import { UpdateUserProfileReq } from '../../domain/usecases/UpdateUserProfileUseCase';

export const route: () => RouteObject = () => {
  return {
    path: 'update',
    element: <UpdateUserProfilePage />,
  };
};

const UpdateUserProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); 
  const  profile  = useAppSelector((state) => state.userProfile.profilePage);
  const email = useAppSelector((s) => s.auth.user?.email);
  const { data, error, status } = useAppSelector((state) => state.userProfile.updateProfilePage);
  useEffect(() => {
    if (email) {
      dispatch(getUserProfileAction(email));
    }
  }, [dispatch, email]);


  const handleSubmit = async (newdata: UpdateUserProfileReq) => {

    const formData = new FormData();
    formData.append('id', newdata.id.toString());
    formData.append('email', newdata.email);
    formData.append('password', newdata.password);
    formData.append('firstName', newdata.firstName);
    formData.append('lastName', newdata.lastName);
    formData.append('phone', newdata.phone);
    formData.append('address', newdata.address);
    if (newdata.avatarFile[0]) {
      formData.append('avatarFile', newdata.avatarFile[0]);
    }
      dispatch(updateUserProfileAction(formData));

  };
  useEffect(() => {
    if(status === 'succeeded'){
      console.log(status)
      dispatch(resetUpdateProfileStatus());
      navigate('/profile') ;
    }
  }, [ status, navigate,dispatch]);

  if (status === 'loading') {
    return <div>Loading</div>;
  }

  return (
    <div className="p-4">
      <UpdateUserProfileComp 
        onSubmit={handleSubmit} 
        initialData={profile.data} 
        serverError={error}
      />
    </div>
  );
};

export default UpdateUserProfilePage;
