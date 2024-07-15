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

  const { status, error } = useAppSelector((state) => state.auth.signUpPage);
  const handleSubmit = (data: any) => {
    dispatch(registerAction({ registerReq: data }));
  };

  useEffect(() => {
    console.log(status);

    if (status == 'succeeded') {
      navigate('/Auth/login');
    }
  }, [status]);

  return (
    <div>
      {error && <h3>{error}</h3>}
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateRegisterPage;
