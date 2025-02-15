import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logOutAction } from '../../../features/auth/presentation/redux/AuthAction';
import { useAppDispatch } from '../../context/store';

interface HomeDropdownUserProps {
  username: string;
  avatarUrl: string;
  onClick: () => void;
  isOpen: boolean;
  onLogout: () => void;
}

const HomeDropdownUser: React.FC<HomeDropdownUserProps> = ({
  username,
  avatarUrl,
  onClick,
  isOpen,
  onLogout 
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="relative">
      <button className="flex items-center space-x-3 hover:bg-gray-100 py-3 px-5 rounded-lg transition-all">
        <Link to={`/profile`} className="flex items-center space-x-3">
          <img
            src={avatarUrl}
            alt={username}
            className="w-12 h-12 rounded-full"
          />
          <span className="text-base font-semibold text-gray-800">{username}</span>
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={onClick}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 w-56 bg-white shadow-lg py-2 rounded-lg z-20">
          <Link to={`/profile`} className="block px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100">
            Profile
          </Link>
          <button
            onClick={onLogout}
            className="block w-full text-left px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
  
};

export default HomeDropdownUser;
