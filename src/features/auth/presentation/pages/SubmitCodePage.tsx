import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../common/context/store';
import { reSenVerifyCodeAction, resetVerifyPage, verifyCodeAction } from '../redux/AuthAction';
import { RouteObject, useNavigate } from 'react-router-dom';
import ReSendVerifyCode, { ReSendVerifyCodeReq } from '../../domain/usecases/ResendVerifyCode';
import { VerifyRequest } from '../../domain/usecases/VerifyCode';

export const route: () => RouteObject = () => {
    return {
        path: "verify",
        element: <SubmitCodePage />
    }
}

const SubmitCodePage: React.FC = () => {
    const [code, setCode] = useState(['', '', '', '']);
    const [email, setEmail] = useState('');
    const [codeError, setCodeError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const result = useAppSelector((s) => s.auth.verifyPage);
    const reSendResult = useAppSelector((s) => s.auth.reSendVerifyPage);

    const handleChange = (index: number, value: string) => {
        const newCode = [...code];
        newCode[index] = value.slice(0, 1); // Allow only single character input
        setCode(newCode);

        if (index < 3 && value) {
            const nextInput = document.getElementById(`input-${index + 1}`);
            nextInput?.focus();
        }
    };

    const validateCode = () => {
        const codeString = code.join('');
        if (codeString.length !== 4 || isNaN(parseInt(codeString, 10))) {
            setCodeError('Please enter a valid 4-digit code.');
            return false;
        }
        setCodeError('');
        return true;
    };

    const validateEmail = () => {
        if (email.trim() === '') {
            setEmailError('Email is required.');
            return false;
        }
        setEmailError('');
        return true;
    };

    const handleResendSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const sendEmail : ReSendVerifyCodeReq = {
            email:email
        }
        if (!validateEmail()) return;
        dispatch(reSenVerifyCodeAction(sendEmail));
    };
    useEffect(() => {
        if(reSendResult.status ===  'succeeded'){
            handleCloseModal(); 
            alert('success resend verify email');
        }
    },[reSendResult.status]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!validateCode()) return;
        const email = localStorage.getItem('email');

        const numericCode = parseInt(code.join(''), 10);
        const req:VerifyRequest = {
            code:numericCode,
            email:email!
        }
        dispatch(verifyCodeAction(req));
    };

    const handleResendClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        if(result.status == 'succeeded'){
            dispatch(resetVerifyPage()); 
            navigate('/Auth/login');
            alert('you can login now if you are student, but if you are teacher you need to wait for admin accept your access')
        }
    })

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8">Submit Code</h1>
<form
  onSubmit={handleSubmit}
  className="flex flex-col items-center space-y-6 p-8 border border-gray-300 rounded-2xl bg-white shadow-lg max-w-md w-full"
>
  <div className="flex space-x-4">
    {code.map((digit, index) => (
      <input
        key={index}
        id={`input-${index}`}
        type="text"
        value={digit}
        onChange={(e) => handleChange(index, e.target.value)}
        className="w-16 h-16 text-center text-2xl border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500"
        maxLength={1}
        inputMode="numeric"
        pattern="[0-9]*"
      />
    ))}
  </div>

  {codeError && (
    <p className="text-red-500 text-sm italic mt-2">{codeError}</p>
  )}

  {result.errors?.message && (
    <p className="text-red-500 text-sm italic mt-2">{result.errors?.message}</p>
  )}

  <button
    type="submit"
    className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700"
  >
    Submit
  </button>

  <button
    type="button"
    onClick={handleResendClick}
    className="mt-6 text-blue-600 hover:underline text-lg"
  >
    Resend Verification Code
  </button>
</form>

       
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Resend Verification Code</h2>
                        <form onSubmit={handleResendSubmit} className="flex flex-col space-y-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="p-2 border border-gray-300 rounded-lg"
                                placeholder="Enter your email"
                            />
                            {emailError && (
                                <p className="text-red-500 text-xs italic mt-1">{emailError}</p>
                            )}
                            {reSendResult.errors?.message && (
                        <p className="text-red-500 text-xs italic mt-1">{reSendResult.errors?.message}</p>
                    )}
                            <div className="flex space-x-4">
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                    Send Code
                                </button>
                                <button type="button" onClick={handleCloseModal} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubmitCodePage;
