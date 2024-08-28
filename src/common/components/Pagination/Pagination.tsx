
import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;

}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {

  const handleChangePage = (newPage: number) => {
   
  console.log(totalPages);
  console.log(currentPage);
    if (newPage >= 0 && newPage < totalPages) {
        console.log('pagechange')
      onPageChange(newPage);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-6">
      {totalPages > 0 ? (
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleChangePage(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            Previous
          </button>
          <span className="text-lg">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={() => handleChangePage(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      ) : (
        <span className="text-lg">No pages available</span>
      )}
    </div>
  );
};


export default Pagination;
