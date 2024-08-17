import { RouteObject, useNavigate } from 'react-router-dom';
import { registerAction, resetSignUpStatus } from '../redux/AuthAction';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../common/context/store';
import RegisterForm from '../components/RegisterForm';
import { RegisterReq } from '../../domain/usecases/Register';

export const route: () => RouteObject = () => {
  return {
    path: 'register',
    element: <CreateRegisterPage />,
  };
};

const CreateRegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data,status, error } = useAppSelector((state) => state.auth.signUpPage);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (data: RegisterReq) => {
    localStorage.setItem('email',data.email);
    dispatch(registerAction({ registerReq: data }));
  };

  useEffect(() => { 
    if (status === 'succeeded') {
      setSuccessMessage('Registration successful! Please log in.');
      alert('success register , please check your email to verify')
      dispatch(resetSignUpStatus()); // Reset status after success
      navigate('/Auth/verify');
    }
  }, [status, navigate, dispatch]);

  useEffect(() => {
    setSuccessMessage(null);
  }, []);


  return (
    <div>
      {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
      <RegisterForm onSubmit={handleSubmit} errorMessage={error} />
    </div>
  );
};

export default CreateRegisterPage;
