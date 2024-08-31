import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import HomeDropdownUser from './HomeDropdownUser';
import HomeSearch from './HomeSearch';
import { useAppSelector } from '../../context/store';
import { logOutAction } from '../../../features/auth/presentation/redux/AuthAction';
import { LogOutReq } from '../../../features/auth/domain/usecases/LogOut';

interface HomeHeaderProps {
  title: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ title }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const logoutError = useAppSelector((state) => state.auth.logoutError); // Access the logout error state

  const handleUserClick = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Search query: ${searchQuery}`);
    // Add search logic here
  };

  const handleLogout = async () => {
    if (user?.email) {
      const req: LogOutReq = { email: user.email };
      await dispatch(logOutAction(req));
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/Auth/login'); // Redirect to login page after logout
    }
  };
  useEffect(() => {
    if (logoutError) {
      alert(`Logout failed: ${logoutError}`); // Display the logout error
    }
  }, [logoutError]);
  const blogLink = user?.role.toLowerCase() === 'teacher' ? 'http://localhost:5173/dashboard/teacher/blog_ui' : '/community/blog_ui';
  console.log("role",user?.role.toLowerCase());
  return (
    <header className="bg-gray-100 py-4 shadow-md px-5">
      <div className="container mx-auto flex items-center justify-between">
        <Link to={'/'} className="flex items-center space-x-2">
          <img src="/public/defaultimage/education635.logowik.com.png" alt="EduChain Logo" className="w-12 h-12" />
          <h1 className="text-3xl font-extrabold text-gray-800">EduChain</h1>
        </Link>
        <nav className="flex space-x-6">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/courses">Courses</NavLink>
          <NavLink to={blogLink}>Post</NavLink>
          <NavLink to="/contact_us">Contact Us</NavLink>
        </nav>
        <div className="flex items-center">
          {user ? (
            <HomeDropdownUser
              username={`${user?.firstName} ${user?.lastName}`}
              avatarUrl={user.avatarPath}
              onClick={handleUserClick}
              isOpen={isUserDropdownOpen}
              onLogout={handleLogout}
            />
          ) : (
            <button
              className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition"
              onClick={() => navigate('/Auth/login')}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
  
};

const NavLink: React.FC<{ to: string; children: string }> = ({
  to,
  children,
}) => {
  return (
    <div className="relative group">
      <a href={to} className="hover:underline text-lg font-medium">
        {children}
      </a>
      {children === 'Pages' && (
        <div className="hidden group-hover:block absolute top-full left-0 w-56 bg-white shadow-lg py-2 rounded-lg z-20">
          <a href="#" className="block px-6 py-3 text-sm hover:bg-gray-100 transition-all">
            About me
          </a>
          <a href="#" className="block px-6 py-3 text-sm hover:bg-gray-100 transition-all">
            About us 01
          </a>
          <a href="#" className="block px-6 py-3 text-sm hover:bg-gray-100 transition-all">
            View all posts →
          </a>
        </div>
      )}

      {children === 'Event' && (
        <div className="hidden group-hover:block absolute top-full left-0 w-56 bg-white shadow-lg py-2 rounded-lg z-20">
          <a href="#" className="block px-6 py-3 text-sm hover:bg-gray-100 transition-all">
            Event 1
          </a>
          <a href="#" className="block px-6 py-3 text-sm hover:bg-gray-100 transition-all">
            Event 2
          </a>
        </div>
      )}
    </div>
  );
  
};

export { HomeHeader };
