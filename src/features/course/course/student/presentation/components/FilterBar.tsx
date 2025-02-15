import React, { useCallback, useEffect, useState } from 'react';
import AppPagination from '../../../../../../common/components/Pagination/AppPagination';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../common/context/store';
import { fetchListCategories } from '../../data/services/handleGetListCategories';
import {
  CourseSearchParams,
  searchCourses,
} from '../../data/services/handleGetListCourses';

const FilterBar = () => {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector(
    (state) => state.courses.student.listCoursesPage,
  );

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState('title');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      setPage(0);
    },
    [],
  );

  const handleSortByChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortBy(e.target.value);
    },
    [],
  );

  const handleCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, categoryId: number) => {
      if (e.target.checked) {
        setSelectedCategoryIds([...selectedCategoryIds, categoryId]);
      } else {
        setSelectedCategoryIds(
          selectedCategoryIds.filter((id) => id !== categoryId),
        );
      }
      setPage(0);
    },
    [selectedCategoryIds],
  );

  const fetchCourses = useCallback(() => {
    const request: CourseSearchParams = {
      categoryIds: selectedCategoryIds,
      search,
      page,
      sortBy,
    };

    dispatch(searchCourses(request));
  }, [dispatch, search, page, sortBy, selectedCategoryIds]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    dispatch(fetchListCategories());
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-start">
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-4">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="px-2 py-1 border rounded-md"
          />
          <select
            value={sortBy}
            onChange={handleSortByChange}
            className="px-2 py-1 border rounded-md"
          >
            <option value="title">Sort by Title</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>

        {/* Category Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md w-64"
          >
            Select Categories
          </button>
          {isCategoryDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-10">
              <div className="p-4 max-h-60 overflow-auto">
                {data?.categories?.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center space-x-2 p-2 hover:bg-blue-100 rounded-md cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategoryIds.includes(category.id)}
                      onChange={(e) => handleCategoryChange(e, category.id)}
                      className="mr-2"
                    />
                    <span className="text-sm">{category.categoryName}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <AppPagination
        totalPages={data?.courses?.totalPages || 0}
        currentPage={page}
        onPageChange={(newPage: number) => {
          setPage(newPage);
        }}
      />
    </div>
  );
};

export default FilterBar;
