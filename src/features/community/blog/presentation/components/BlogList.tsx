import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../../../../common/context/store';
import { deleteBlog, fetchBlog, fetchBlogs } from '../redux/blogActions';
import Blog from '../../domain/entities/blog';
import { TakeBlogsReq } from '../../domain/usecases/GetBlogs';

interface BlogListCompProps {
  data: Blog[];
}


const BlogList: React.FC<BlogListCompProps> = ({data}) => {
  const dispatch = useAppDispatch();

  const {  status, error } = useAppSelector((state) => state.blogs);  
  const handleDelete = (id: number) => {
    dispatch(deleteBlog(id))
  };



  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
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
                {data && data.map((bl: Blog) => (
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
                        onClick={() => handleDelete(bl.id)}
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
  );
};

export default BlogList;
