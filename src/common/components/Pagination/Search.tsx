import React, { useState, useEffect } from 'react';

interface SearchComponentProps {
    onSearch: (query: string) => void;
    placeholder?: string;
    value: string; // Add value prop to control the input field
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch, placeholder = 'Search...', value }) => {
    const [query, setQuery] = useState(value);

    useEffect(() => {
        setQuery(value); // Update local state when value prop changes
    }, [value]);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            onSearch(query);
        }, 300); 

        return () => clearTimeout(debounceTimer); 
    }, [query, onSearch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value); 
    };

    return (
        <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
            <input 
                type="text" 
                value={query} 
                onChange={handleChange}
                placeholder={placeholder} 
                className="w-full p-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default SearchComponent;
