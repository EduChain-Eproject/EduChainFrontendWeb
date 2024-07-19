import { RouteObject, useNavigate } from 'react-router-dom';
import { registerAction } from '../redux/AuthAction';
import React, { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../common/context/store';
import RegisterForm from '../components/RegisterForm';

export const route: () => RouteObject = () => {
  return {
    path: 'register',
    element: <CreateRegisterPage />,
  };
};

const CreateRegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const data = useAppSelector((state) => state.auth.signUpPage.data);
  const { status, error } = useAppSelector((state) => state.auth.signUpPage);
  const handleSubmit = (data: any) => {
    dispatch(registerAction({ registerReq: data }));
  };

  useEffect(() => {
    console.log(status);

    if (status == 'succeeded') {
      alert(data?.message);
      navigate('/Auth/login');
    }
  }, [status]);

  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} errorMessage={error} />
    </div>
  );
};

export default CreateRegisterPage;
