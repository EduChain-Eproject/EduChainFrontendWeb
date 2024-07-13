import React from 'react'
import { RouteObject, useLocation, useParams } from 'react-router-dom';
import ResetPasswordForm from '../components/ResetPasswordForm';
import { useAppDispatch, useAppSelector } from '../../../../common/context/store';
import { ResetPasswrodAction } from '../redux/AuthAction';
import { ResetPasswordReq } from '../../domain/usecases/ResetPassword';

export const route:() => RouteObject = () => {
    return {
        path:"reset_action",
        element:<ResetPasswordPage/>
    }
}

const ResetPasswordPage = () => {
  const dispatch = useAppDispatch();
    const location = useLocation();

  // Use URLSearchParams to extract the 'code' parameter
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');
  const {status,error,data} = useAppSelector(state => state.auth.resetPasswordPage)
const onSubmit = (data:ResetPasswordReq) => {
   data.code = code!;
  console.log(data);
  dispatch(ResetPasswrodAction({req:data}));
}; 

  return (
      <div>
        <ResetPasswordForm onSubmit={onSubmit} />
      </div>
  )
}

export default ResetPasswordPage