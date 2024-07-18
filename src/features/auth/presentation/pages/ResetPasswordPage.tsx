import React from 'react'
import { RouteObject, useLocation, useParams } from 'react-router-dom';
import ResetPasswordForm from '../components/ResetPasswordForm';
import { useAppDispatch, useAppSelector } from '../../../../common/context/store';
import { ResetPasswordAction } from '../redux/AuthAction';
import { ResetPasswordReq } from '../../domain/usecases/ResetPassword';

export const route: () => RouteObject = () => {
  return {
    path: "reset_action",
    element: <ResetPasswordPage />
  }
}

const ResetPasswordPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');

  const onSubmit = (data: ResetPasswordReq) => {
    data.code = code!;
    dispatch(ResetPasswordAction({ req: data }));
  };

  return (
    <div>
      <ResetPasswordForm onSubmit={onSubmit} />
    </div>
  )
}

export default ResetPasswordPage