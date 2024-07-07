import React from 'react';

interface AppPaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const AppPagination: React.FC<AppPaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, index) => index);

    return (
        <div className="flex justify-center mt-4">
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`mx-1 px-3 py-1 border rounded-md ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                >
                    {page + 1}
                </button>
            ))}
        </div>
    );
};

export default AppPagination;
