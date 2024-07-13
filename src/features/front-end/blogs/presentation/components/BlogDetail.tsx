import React, { useEffect, useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../../../../common/context/store';
import { fetchBlog } from '../../data/redux/action/fetchBlog';
import { useParams } from 'react-router-dom';
import { ThumbUpIcon } from '@heroicons/react/solid';
import { ThumbDownIcon } from '@heroicons/react/outline';

const BlogUIList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { blogDetail, status } = useAppSelector((state: RootState) => state.blogUiSlice);
    const { blogId } = useParams<{ blogId: string }>();
    const bId = Number(blogId);
    const [commentText, setCommentText] = useState<string>('');

    useEffect(() => {
        if (bId) {
            dispatch(fetchBlog(bId));
        }
    }, [dispatch, bId]);

    const handleCommentSubmit = () => {
        console.log('Submitted comment:', commentText);
        setCommentText('');
    };



    return (
        <div className="container mx-auto p-4">
            {status === 'loading' && <p className="text-center text-gray-500">Loading...</p>}
            {status === 'failed' && <p className="text-center text-red-500">Failed to fetch blogs</p>}
            {status === 'succeeded' && blogDetail && (
                <div className="p-6" style={{ width: '50%', margin: '0 auto' }}>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <img src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${blogDetail.data?.photo}`} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
                            <p>{blogDetail.data?.user.firstName} {blogDetail.data?.user.lastName}</p>
                        </div>
                        <h3 className="text-xl font-semibold">Category: {blogDetail.data?.blogCategory.categoryName}</h3>
                    </div>
                    <img
                        src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${blogDetail.data?.photo}`}
                        alt={blogDetail.data?.title}
                        className="w-full h-full object-cover mb-4"
                    />
                    <h2 className="text-2xl font-bold mb-4">{blogDetail.data?.title}</h2>
                    <p className="text-gray-700 mb-6">{blogDetail.data?.blogText}</p>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center w-full mr-2">
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center w-full justify-center">
                                <ThumbUpIcon className="h-5 w-5 mr-2" />
                                <span>Vote Up</span>
                                <p className="text-white-500 ml-2">{blogDetail.data?.voteUp}</p>
                            </button>
                        </div>
                        <div className="flex items-center w-full ml-2">
                            <button className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center w-full justify-center">
                                <ThumbDownIcon className="h-5 w-5 mr-2" />
                                <span>Vote Down</span>
                                <p className="text-white-500 ml-2">{blogDetail.data?.voteDown}</p>
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <ul>
                            {blogDetail.data?.blogComments?.map(comment => (
                                <li key={comment.id} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-sm">
                                    <div className="flex items-center mb-2">
                                        <img src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${blogDetail.data?.photo}`} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
                                        <p className="text-sm text-gray-500">by {comment.user.firstName} {comment.user.lastName} on {new Date(comment.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <p className="text-gray-800">{comment.text}</p>
                                    {/* Render replies if they exist */}
                                    {comment.replies && comment.replies.length > 0 && (
                                        <ul className="ml-4">
                                            {comment.replies.map(reply => (
                                                <li key={reply.id} className="mb-2 p-2 bg-gray-50 rounded-lg shadow-sm">
                                                    <div className="flex items-center mb-2">
                                                        <img src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${blogDetail.data?.photo}`} alt="Avatar" className="w-6 h-6 rounded-full mr-2" />
                                                        <p className="text-xs text-gray-400">by {reply.user.firstName} {reply.user.lastName} on {new Date(reply.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                    <p className="text-gray-700">{reply.text}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            )) || []}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogUIList;
