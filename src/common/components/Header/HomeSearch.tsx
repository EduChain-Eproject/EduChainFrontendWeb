import React from 'react';

interface HomeSearchProps {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const HomeSearch: React.FC<HomeSearchProps> = ({
    placeholder,
    value,
    onChange,
    onSubmit,
}) => {
    return (
        <form onSubmit={onSubmit} className=' relative'>
            <input
                type="search"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="pl-10 pr-4 py-2 w-48 bg-gray-100 rounded"
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 absolute left-2 top-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
        </form>
    );
};

export default HomeSearch;