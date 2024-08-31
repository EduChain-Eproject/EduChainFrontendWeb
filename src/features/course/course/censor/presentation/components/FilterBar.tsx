import React from 'react';
import { CourseStatusForCensor } from '../../data/services/handleGetCourseByStatus';

interface FilterBarProps {
  search: string;
  setSearch: (value: string) => void;
  page: number;
  setPage: (value: number) => void;
  size: number;
  setSize: (value: number) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  selectedStatus: CourseStatusForCensor;
  setSelectedStatus: (value: CourseStatusForCensor) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  search,
  setSearch,
  page,
  setPage,
  size,
  setSize,
  sortBy,
  setSortBy,
  selectedStatus,
  setSelectedStatus,
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between mb-6 p-4 bg-white shadow-md rounded-lg">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full lg:w-1/3 mb-4 lg:mb-0 lg:mr-4"
      />
      <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4 w-full lg:w-auto">
        <select
          value={selectedStatus}
          onChange={(e) =>
            setSelectedStatus(e.target.value as CourseStatusForCensor)
          }
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full lg:w-auto"
        >
          <option value={CourseStatusForCensor.ALL}>All</option>
          <option value={CourseStatusForCensor.APPROVED}>Approved</option>
          <option value={CourseStatusForCensor.UNDER_REVIEW}>Under Review</option>
          <option value={CourseStatusForCensor.DELETED}>Deleted</option>
        </select>
        <select
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full lg:w-auto"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full lg:w-auto"
        >
          <option value="title">Sort by Title</option>
          <option value="price">Sort by Price</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;