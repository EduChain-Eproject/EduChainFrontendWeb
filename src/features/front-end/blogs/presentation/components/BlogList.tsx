import React, { useEffect, useState } from 'react';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../../../../common/context/store';
import {
  fetchBlogs,
  FindAllBlogRequest,
} from '../../data/redux/action/fetchBlogs';
import { deleteBlog } from '../../data/redux/action/deleteBlog';
import { Blog } from '../../data/model/Blog';
import { ChatIcon, TrashIcon, PencilIcon } from '@heroicons/react/outline';
import { Link, useNavigate } from 'react-router-dom';
import { filterBlog, FilterBlogReq } from '../../data/redux/action/filterBlog';
import { fetchBlogCategories } from '../../data/redux/action/fetchCategories';
import { BlogCategory } from '../../data/model/BlogCategory';
import VoteButton from './VoteButton';

interface BlogUIListProps {
  data: Blog[];
  // onBlock: (req:BlockOrUnBlockReq) => void;
}

const BlogUIList: React.FC<BlogUIListProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  // const { data: blogCategories } = useAppSelector(
  //   (state) => state.blogUiSlice.blogCategories,
  // );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<number | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortStrategy, setSortStrategy] = useState('descTime');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const userId = useAppSelector((s) => s.auth?.user?.id);
  const role = useAppSelector((s) => s.auth.user?.role);
  useEffect(() => {
    dispatch(fetchBlogCategories());
  }, [dispatch]);
  const openModal = (id: number) => {
    setBlogToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBlogToDelete(null);
  };

  const navigate = useNavigate();

  const handleDelete = async () => {
    if (blogToDelete !== null) {
      try {
        await dispatch(deleteBlog(blogToDelete)).unwrap(); // Dispatch delete action
        setIsModalOpen(false);
        setBlogToDelete(null);
      } catch (error) {
        console.error('Failed to delete blog:', error);
        // Optionally, show an error message to the user
      }
    }
  };
  useEffect(() => {
    console.log('BlogUIList props changed:', data);
  }, [data]);

  function handleFilterChange(): void {
    console.log('filter');
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Blog List Section */}
        <div className="w-full md:w-3/4">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data &&
              data.map((blog: Blog) => (
                <li
                  key={blog.id}
                  className="bg-white p-6 rounded-lg shadow-md relative"
                >
                  {/* Conditionally Render Edit/Delete Buttons */}
                  {blog.user.id === userId && (
                    <div className="absolute top-0 right-0 flex space-x-2">
                      <button
                        className="bg-slate-500 text-black hover:bg-red-800 w-8 h-8 flex items-center justify-center"
                        onClick={() => openModal(blog.id)}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                      <Link to={`/community/blog_ui/edit/${blog.id}`}>
                        <button className="bg-slate-500 text-black hover:bg-blue-800 w-8 h-8 flex items-center justify-center">
                          <PencilIcon className="h-5 w-5" />
                        </button>
                      </Link>
                    </div>
                  )}

                  <div className="flex justify-between items-center mb-4 mt-4">
                    {/* Left-aligned: User's name */}
                    <div className="flex items-center">
                      <p className="text-xl font-semibold">
                        {blog.user.firstName} {blog.user.lastName}
                      </p>
                    </div>

                    {/* Right-aligned: Date above and Category below */}
                    <div className="flex flex-col items-end">
                      <p className="text-sm">
                        at {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm">
                        {/* Category: {blog.blogCategory.categoryName} */}
                      </p>
                    </div>
                  </div>
                  <Link to={`/community/blog_ui/${blog.id}`}>
                    <img
                      src={
                        blog.photo
                          ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${
                              blog.photo
                            }`
                          : '/public/defaultimage/1000_F_484887682_Mx57wpHG4lKrPAG0y7Q8Q7bJ952J3TTO.jpg'
                      }
                      alt={blog.title || 'Default Image'}
                      className="w-full h-75 object-cover mb-4"
                    />
                  </Link>
                  <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center w-full mr-2"></div>
                    <div className="flex items-center w-full ml-2">
                      <Link
                        to={
                          role === 'STUDENT'
                            ? `/community/blog_ui/${blog.id}`
                            : role === 'TEACHER'
                            ? `/dashboard/teacher/blog_ui/${blog.id}`
                            : '#'
                        }
                        className="flex w-full"
                      >
                        <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center w-full justify-center">
                          <ChatIcon className="h-5 w-5 mr-3" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this post?</p>
            <div className="flex justify-center">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogUIList;
