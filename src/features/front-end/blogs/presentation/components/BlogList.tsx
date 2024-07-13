import React, { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../../../../common/context/store';
import { fetchBlogs } from '../../data/redux/action/fetchBlogs';
import { Blog } from '../../data/model/Blog';
import { ThumbUpIcon, ThumbDownIcon, ChatIcon } from '@heroicons/react/outline';

const BlogUIList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { blogs, status } = useAppSelector((state: RootState) => state.blogUiSlice);

    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    const handleVoteUp = (id: number) => {
        console.log('Vote Up for post:', id);
    };

    const handleVoteDown = (id: number) => {
        console.log('Vote Down for post:', id);
    };

    function handleComment(id: number): void {
        throw new Error('Function not implemented.');
    }

    return (
        <div className="container mx-auto p-4">
            {status === 'loading' && <p className="text-center text-gray-500">Loading...</p>}
            {status === 'failed' && <p className="text-center text-red-500">Failed to fetch blogs</p>}
            {status === 'succeeded' && blogs && (
    <div className="p-6" style={{ width: '50%', margin: '0 auto' }}>
    <ul className="space-y-4">
        {blogs?.data?.map((blog: Blog) => (
            <li key={blog.id} className="bg-white p-6 rounded-lg shadow-md">
                {/* User and Category Display */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <img src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${blog.photo}`} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
                        <p className="text-xl font-semibold">{blog.user.firstName} {blog.user.lastName}</p>
                    </div>
                    <h2 className="text-xl">Category: {blog.blogCategory.categoryName}</h2>
                </div>
                {/* Blog Image */}
                <img src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${blog.photo}`} alt={blog.title} className="w-full h-75 object-cover mb-4" />
                {/* Blog Title */}
                <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
                {/* Blog Text */}
                <p className="text-gray-700 mb-6">{blog.blogText}</p>
                {/* Voting Buttons */}
                <div className="flex justify-between items-center mb-4">
      <div className="flex items-center w-full mr-2">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center w-full justify-center"
          onClick={() => handleVoteUp(blog.id)}
        >
          <ThumbUpIcon className="h-5 w-5 mr-2" />
          <p className="text-white-500 ml-2">{blog.voteUp}</p>
        </button>
      </div>
      <div className="flex items-center w-full mx-2">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center w-full justify-center"
          onClick={() => handleVoteDown(blog.id)}
        >
          <ThumbDownIcon className="h-5 w-5 mr-2" />
          <p className="text-white-500 ml-2">{blog.voteDown}</p>
        </button>
      </div>
      <div className="flex items-center w-full ml-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center w-full justify-center"
          onClick={() => handleComment(blog.id)}
        >
          <ChatIcon className="h-5 w-5 mr-3" /> <p>0</p>
        </button>
      </div>
    </div>
                {/* Comments section removed */}
            </li>
        ))}
    </ul>
    </div>
)}
        </div>
    );
};

export default BlogUIList;