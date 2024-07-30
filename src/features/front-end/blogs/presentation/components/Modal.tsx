import React from 'react';

interface ModalProps {
  type: 'error' | 'success';
  message: string;
}

const Modal: React.FC<ModalProps> = ({ type, message }) => {
  const modalBackground = type === 'success' ? 'bg-green-100' : 'bg-red-100';
  const modalTextColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const modalBorderColor = type === 'success' ? 'border-green-400' : 'border-red-400';

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 border-l-8 ${modalBorderColor} ${modalBackground} rounded-lg shadow-2xl max-w-lg w-full`}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {type === 'success' ? (
            <svg
              className="h-10 w-10 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg
              className="h-10 w-10 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>
        <div className="ml-4">
          <p className={`text-lg font-medium ${modalTextColor}`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;