import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../common/context/store'
import UpdateUserProfileComp from "../components/UpdateUserProfileComp"
import { RouteObject } from 'react-router-dom'
import { getUserProfileAction, updateUserProfileAction } from '../redux/UserProfileAction'
import { UpdateUserProfileReq } from '../../domain/usecases/UpdateUserProfileUseCase'

export const route:() => RouteObject = () =>{
    return{
        path:"",
        element:<UpdateUserProfilePage/>
  };
}

const UpdateUserProfilePage = () => {
  const dispatch = useAppDispatch();
  const {data,error,status} = useAppSelector((state) => state.userProfile.profilePage);
  const email = useAppSelector(s => s.auth.user?.email)
  useEffect(() => {
    if(email) {
        dispatch(getUserProfileAction(email));
    }
},[dispatch,email]);
  //nhan data submit tu page con
  const handleSubmit = (newdata:UpdateUserProfileReq) => {
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
  
    dispatch(updateUserProfileAction({req:formData}));
    console.log(...formData);
  }
  // const initialData = data ??{};
  return (
    <div>
      <UpdateUserProfileComp onSubmit={handleSubmit} initialData={data}/>
    </div>
  )
}

export default UpdateUserProfilePage;