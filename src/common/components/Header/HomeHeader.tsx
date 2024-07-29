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

  return (
    <header className="bg-gray-100 py-4 shadow-md px-5">
      <div className="container mx-auto flex items-center justify-between">
        <Link to={'/'}>
          <h1 className="text-2xl font-bold">{title}</h1>
        </Link>
        <nav className="flex space-x-4">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/courses">Courses</NavLink>
          <NavLink to="/community/blog_ui">Blog</NavLink>
          <NavLink to="#">Contact Us</NavLink>
        </nav>
        <div className="flex flex-row items-center justify-center">
          {user ? (
            <HomeDropdownUser
              username={`${user?.firstName}  ${user?.lastName}`}
              avatarUrl="https://example.com/avatar.jpg"
              onClick={handleUserClick}
              isOpen={isUserDropdownOpen}
              onLogout={handleLogout} // Pass the logout handler
            />
          ) : (
            <button
              className="px-3 py-1 bg-meta-5 rounded-xl text-white"
              onClick={() => navigate('/Auth/login')}
            >
              Login
            </button>
          )}
          <HomeSearch
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSubmit={handleSearchSubmit}
          />
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
      <a href={to} className="hover:underline">
        {children}
      </a>
      {children === 'Pages' && (
        <div className="hidden group-hover:block absolute top-full left-0 w-48 bg-white shadow-md py-2">
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">
            About me
          </a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">
            About us 01
          </a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">
            View all posts →
          </a>
        </div>
      )}
      {children === 'Courses' && (
        <div className="hidden group-hover:block absolute top-full left-0 w-48 bg-white shadow-md py-2">
          <Link to={'/courses'} className="block px-4 py-2 hover:bg-gray-100">
            Courses
          </Link>
        </div>
      )}
      {children === 'Event' && (
        <div className="hidden group-hover:block absolute top-full left-0 w-48 bg-white shadow-md py-2">
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">
            Event 1
          </a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">
            Event 2
          </a>
        </div>
      )}
      {children === 'Blog' && (
        <div className="hidden group-hover:block absolute top-full left-0 w-48 bg-white shadow-md py-2">
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">
            Blog post 1
          </a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">
            Blog post 2
          </a>
        </div>
      )}
    </div>
  );
};

export { HomeHeader };
