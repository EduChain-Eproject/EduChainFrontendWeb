import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  titleSearch: string;
  setSearch: (search: string) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange, titleSearch, setSearch }) => {
  const handleChangePage = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
        console.log('pagechange')
      onPageChange(newPage);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={titleSearch}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by title"
      />
      <button onClick={() => handleChangePage(currentPage - 1)} disabled={currentPage === 0}>
        Previous
      </button>
      <span>Page {currentPage + 1} of {totalPages}</span>
      <button onClick={() => handleChangePage(currentPage + 1)} disabled={currentPage === totalPages - 1}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
