import React from 'react';
import { CourseStatusForCensor } from '../../domain/usecases/GetCoursesByStatus';

interface FilterBarProps {
    search: string;
    setSearch: (value: string) => void;
    page: number;
    setPage: (value: number) => void;
    size: number;
    setSize: (value: number) => void;
    sortBy: string;
    setSortBy: (value: string) => void;
    selectedStatus: CourseStatusForCensor; // Use the CourseStatus enum
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
        <div className="flex items-center justify-between mb-4">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="p-2 border border-gray-300 rounded-md mr-2 focus:outline-none focus:border-blue-500"
            />
            <div className="flex items-center space-x-2">
                <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as CourseStatusForCensor)}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                >
                    <option value={CourseStatusForCensor.ALL}>All</option>
                    <option value={CourseStatusForCensor.APPROVED}>Approved</option>
                    <option value={CourseStatusForCensor.UNDER_REVIEW}>Under Review</option>
                    <option value={CourseStatusForCensor.DELETED}>Deleted</option>
                </select>
                <select
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                </select>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
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
