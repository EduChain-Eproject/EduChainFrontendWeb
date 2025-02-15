import React, { useEffect, useState } from 'react';
import { RouteObject, useNavigate } from 'react-router-dom';
import BlogUIList from '../components/BlogList';
import Pagination from '../../../../../common/components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../../../../../common/context/store';
import { fetchBlogs, FindAllBlogRequest } from '../../data/redux/action/fetchBlogs';
import { setPage } from '../../data/redux/blogUISlice';
import { fetchBlogCategories } from '../../data/redux/action/fetchCategories';
import { filterBlog } from '../../data/redux/action/filterBlog';

export const route: () => RouteObject = () => {
    return {
        path: "blog_ui",
        element: <BlogUIPage />
    }
}


const BlogUIPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { totalPages, currentPage } = useAppSelector((state) => state.blogUiSlice.pagination);
    const { data: blogList } = useAppSelector((state) => state.blogUiSlice.blogs);
    const { data: blogCategories } = useAppSelector((state) => state.blogUiSlice.blogCategories);
    const  filterState  = useAppSelector((state) => state.blogUiSlice.filterState);
  
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortStrategy, setSortStrategy] = useState('descTime');
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      // Fetch blogs and categories on initial load
      dispatch(fetchBlogs({ page: currentPage, size: 5, sortBy: 'createdAt' }));
      dispatch(fetchBlogCategories());
    }, [dispatch, currentPage]);
  
    const handleFilterChange = async () => {
      const filterReq = {
        page: 0, // Reset to the first page when applying filters
        size: 5,
        keyword: searchKeyword || "",
        sortStrategy: sortStrategy,
        categoryIds: selectedCategoryIds.length ? selectedCategoryIds : [],
      };
      await dispatch(filterBlog(filterReq));
      setIsFilterApplied(true); // Mark filter as applied
    };
  
    const handlePageChange = (pageNumber: number) => {
      dispatch(setPage(pageNumber));
    };
  
    const displayedData = isFilterApplied ? filterState.data : blogList;
    useEffect(() => {
      if (isFilterApplied) {
        console.log("Filtered Data: ", filterState.data);
      } else {
        console.log("Blog List Data: ", blogList);
      }
    }, [filterState.data, blogList, isFilterApplied]);

    const handleNavigateToCreateBlog = () => {
      navigate("/community/blog_ui/create"); // Programmatically navigate to the create blog page
    };
    return (
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mt-10 mb-8">Blog Classic</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-lg p-4 mb-4 shadow-md">
                      {/* Navigate to Create New Blog Button */}
        <div className="mt-4">
          <button
            type="button"
            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleNavigateToCreateBlog} // Navigate to the new blog creation page
          >
            Create New Blog
          </button>
        </div>
        <br />
              <div>
                <h2 className="text-lg font-bold mb-2">Search</h2>
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-bold mb-2">Sort By</h2>
                <select
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={sortStrategy}
                  onChange={(e) => setSortStrategy(e.target.value)}
                >
                  <option value="descTime">Latest</option>
                  <option value="ascTime">Oldest</option>
                </select>
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-bold mb-2">Category</h2>
                {blogCategories?.map((category) => (
                  <div key={category.id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      name="category"
                      value={category.id}
                      checked={selectedCategoryIds.includes(category.id)}
                      onChange={(e) => {
                        const categoryId = Number(e.target.value);
                        setSelectedCategoryIds((prevIds) =>
                          e.target.checked
                            ? [...prevIds, categoryId]
                            : prevIds.filter((id) => id !== categoryId)
                        );
                      }}
                      className="mr-2"
                    />
                    <label htmlFor={`category-${category.id}`} className="text-lg">
                      {category.categoryName}
                    </label>
                  </div>
                ))}
                <div className="mt-4">
                  <button
                    type="button"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleFilterChange}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-3/4">
            <BlogUIList key={JSON.stringify(displayedData)}  data={displayedData!} />
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
          </div>
        </div>
      </div>
    );
  };
  
  export default BlogUIPage;
  