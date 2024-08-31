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
import { ChatIcon, TrashIcon, PencilIcon, BookOpenIcon } from '@heroicons/react/outline';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<number | null>(null);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data &&
          data.map((blog: Blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative">
                {blog.user.id === userId && (
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition duration-300"
                      onClick={() => openModal(blog.id)}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                    <Link to={`/community/blog_ui/edit/${blog.id}`}>
                      <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700 transition duration-300">
                        <PencilIcon className="h-5 w-5" />
                      </button>
                    </Link>
                  </div>
                )}
                <Link to={`/community/blog_ui/${blog.id}`}>
                  <img
                    src={
                      blog.photo
                        ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${blog.photo}`
                        : '/public/defaultimage/1000_F_484887682_Mx57wpHG4lKrPAG0y7Q8Q7bJ952J3TTO.jpg'
                    }
                    alt={blog.title || 'Default Image'}
                    className="w-full h-48 object-cover"
                  />
                </Link>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <p className="text-lg font-semibold text-gray-800">
                      {blog.user.firstName} {blog.user.lastName}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Link to={`/community/blog_ui/${blog.id}`}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 h-16 overflow-hidden">
                    {blog.title}
                  </h2>
                </Link>
                <div className="flex justify-between items-center">
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
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center w-full justify-center hover:bg-green-600 transition duration-300">
                      <BookOpenIcon className="h-5 w-5 mr-2" />
                      Read now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this post?</p>
            <div className="flex justify-center">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-600 transition duration-300"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
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