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
      <button className="flex items-center space-x-2 hover:bg-gray-100 py-2 px-4 rounded">
        <Link to={`/profile`} className="flex flex-row items-center">
          <img
            src={avatarUrl}
            alt={username}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm">{username}</span>
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
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
        <div className=" absolute top-full right-0 w-48 bg-white shadow-md py-2">
          <Link to={`/profile`} className="block px-4 py-2 hover:bg-gray-100">
            Profile
          </Link>
          <button
            onClick={onLogout}
            className="block px-4 py-2 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeDropdownUser;
