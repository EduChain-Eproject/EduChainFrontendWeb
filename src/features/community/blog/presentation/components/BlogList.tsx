import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../common/context/store';
import { deleteBlog, fetchBlog, fetchBlogs } from '../redux/blogActions';
import Blog from '../../domain/entities/blog';
import { TakeBlogsReq } from '../../domain/usecases/GetBlogs';

interface BlogListCompProps {
  data: Blog[];
}

const BlogList: React.FC<BlogListCompProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.blogs);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    dispatch(deleteBlog(id));
    setIsModalOpen(false);
  };

  const openModal = (id: number) => {
    setBlogToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBlogToDelete(null);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-4xl text-red-500 text-center">Blog</h2>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      #ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      PostBy
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data &&
                    data.map((bl: Blog) => (
                      <tr key={bl.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{bl.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a
                            href={`blog_ui_adminview/${bl.id}`}
                            className="text-blue-600 hover:underline"
                          >
                            {bl.title}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {bl.user?.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => openModal(bl.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-colors duration-300 ease-in-out"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-4">Are you sure you want to delete this blog?</p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => blogToDelete !== null && handleDelete(blogToDelete)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
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

export default BlogList;