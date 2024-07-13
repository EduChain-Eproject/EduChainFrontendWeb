import React from 'react';

interface HomeDropdownUserProps {
    username: string;
    avatarUrl: string;
    onClick: () => void;
    isOpen: boolean;
}


const HomeDropdownUser: React.FC<HomeDropdownUserProps> = ({
    username,
    avatarUrl,
    onClick,
    isOpen,
}) => {
    return (
        <div className="relative">
            <button
                className="flex items-center space-x-2 hover:bg-gray-100 py-2 px-4 rounded"
                onClick={onClick}
            >
                <img src={avatarUrl} alt={username} className="w-8 h-8 rounded-full" />
                <span className="text-sm">{username}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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
                <div className="hidden absolute top-full right-0 w-48 bg-white shadow-md py-2">
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                        Profile
                    </a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                        Settings
                    </a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                        Logout
                    </a>
                </div>
            )}
        </div>
    );
};

export default HomeDropdownUser;