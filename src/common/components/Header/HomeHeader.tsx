import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeDropdownUser from './HomeDropdownUser';
import HomeSearch from './HomeSearch';

interface HomeHeaderProps {
  title: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ title }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const handleUserClick = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Search query: ${searchQuery}`);
    // Add search logic here
  };

  return (
    <header className="bg-gray-100 py-4 shadow-md px-5">
      <div className="container mx-auto flex items-center justify-between">
        <Link to={'/'}>
          <h1 className="text-2xl font-bold">{title}</h1>
        </Link>
        <nav className="flex space-x-4">
          <NavLink to="#">Home</NavLink>
          <NavLink to="#">Pages</NavLink>
          <NavLink to="/courses">Courses</NavLink>
          <NavLink to="#">Event</NavLink>
          <NavLink to="#">Blog</NavLink>
          <NavLink to="#">Contact Us</NavLink>
        </nav>
        <div className="flex flex-row items-center justify-center">
          <HomeDropdownUser
            username="John Doe"
            avatarUrl="https://example.com/avatar.jpg"
            onClick={handleUserClick}
            isOpen={isUserDropdownOpen}
          />
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
