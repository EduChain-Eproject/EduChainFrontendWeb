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
      <h1 className="text-4xl font-bold text-center mt-12 mb-8">Post Classic</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-lg p-6 mb-6 shadow-lg">
            {/* Navigate to Create New Post Button */}
            <div className="mb-6">
              <button
                type="button"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
                onClick={handleNavigateToCreateBlog} // Navigate to the new post creation page
              >
                Create New Post
              </button>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Search</h2>
              <input
                type="text"
                placeholder="Title"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Sort By</h2>
              <select
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortStrategy}
                onChange={(e) => setSortStrategy(e.target.value)}
              >
                <option value="descTime">Latest</option>
                <option value="ascTime">Oldest</option>
              </select>
            </div>
            <div className="mb-6">
  <h2 className="text-xl font-semibold mb-3">Category</h2>
  <div className="relative">
    <select
      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={selectedCategoryIds[0] || ""} // Assuming single selection for dropdown
      onChange={(e) => {
        const categoryId = Number(e.target.value);
        setSelectedCategoryIds([categoryId]); // Replace with the selected category ID
      }}
    >
      <option value="" disabled>
        Select a Category
      </option>
      {blogCategories?.map((category) => (
        <option key={category.id} value={category.id}>
          {category.categoryName}
        </option>
      ))}
    </select>
  </div>
  <div className="mt-4">
    <button
      type="button"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
      onClick={handleFilterChange}
    >
      Submit
    </button>
  </div>
</div>

          </div>
        </div>
        <div className="w-full md:w-3/4">
          <BlogUIList key={JSON.stringify(displayedData)} data={displayedData!} />
          <div className="mt-8 pr-94">
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
          </div>
        </div>
      </div>
    </div>
    
    );
  };
  
  export default BlogUIPage;
  