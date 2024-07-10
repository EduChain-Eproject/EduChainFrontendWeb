import { RouteObject } from "react-router-dom"
import React, { useEffect } from "react"
import UserProfilePage from "../components/UserProfilePage"
import { useAppDispatch, useAppSelector } from "../../../../common/context/store"
import { getUserProfileAction } from "../redux/UserProfileAction"


export const route:() => RouteObject = () => {
    return {
        path:"",
        element:<GetUserProfilePage/>
    }
}

const GetUserProfilePage:React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, error, status } = useAppSelector((state)=> state.userProfile.profilePage)
  console.log(data?.firstName);
  const email = useAppSelector(s => s.auth.user?.email)
  useEffect(() => {
    if(email) {
        dispatch(getUserProfileAction(email));
    }
},[dispatch,email]);

if(status === 'loading'){
    return <div>Loading</div>;
}

if(status === 'failed'){
    return <div>error:{error}</div>;
}

  return(
    <div>
     <h3>User-Profile</h3>
     <h1>{email}</h1>
       <UserProfilePage/>
    </div>
  );
}

export default GetUserProfilePage;
