import React, { useEffect, useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../../../../common/context/store';
import { fetchBlog } from '../../data/redux/action/fetchBlog';
import { useParams } from 'react-router-dom';
import VoteButton from './VoteButton';
import { ThumbUpIcon, PaperAirplaneIcon, ThumbDownIcon } from '@heroicons/react/outline';
import { Sidebar } from './Sidebar';

const BlogDetail: React.FC = () => {
    const dispatch = useAppDispatch();
    const { blogDetail, status } = useAppSelector((state: RootState) => state.blogUiSlice);
    const { blogId } = useParams<{ blogId: string }>();
    
    const [commentText, setCommentText] = useState<string>('');
    const [replyText, setReplyText] = useState<string>('');
    const [activeComment, setActiveComment] = useState<number | null>(null);


    useEffect(() => {
        const id = blogId ? Number(blogId) : Number(localStorage.getItem('blogId'));
        if (id) {
            dispatch(fetchBlog(id));
            localStorage.setItem('blogId', id.toString());
        }
    }, [dispatch, blogId]);
    
    console.log(blogId);
    
    

    const handleCommentSubmit = () => {
        console.log('Submitted comment:', commentText);
        setCommentText('');
    };

    const handleReplySubmit = (commentId: number) => {
        console.log('Submitted reply:', replyText, 'for comment:', commentId);
        setReplyText('');
        setActiveComment(null);
    };

    return (
        <div className="container mx-auto p-4 flex">
            <div className="w-3/4 p-4">
                {status === 'loading' && <p className="text-center text-gray-500">Loading...</p>}
                {status === 'failed' && <p className="text-center text-red-500">Failed to fetch blogs</p>}
                {status === 'succeeded' && blogDetail && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <img src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${blogDetail.data?.photo}`} alt="Avatar" className="w-10 h-10 rounded-full mr-3" />
                                <div>
                                    <p className="font-semibold">{blogDetail.data?.user.firstName} {blogDetail.data?.user.lastName}</p>
                                    <p className="text-sm text-gray-500">Category: {blogDetail.data?.blogCategory.categoryName}</p>
                                </div>
                            </div>
                    
                        </div>
                        <h2 className="text-xl font-bold mb-4">{blogDetail.data?.title}</h2>
                        <img
                            src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${blogDetail.data?.photo}`}
                            alt={blogDetail.data?.title}
                            className="w-full h-64 object-cover mb-4 rounded-lg"
                        />
                        <p className="text-gray-700 mb-6">{blogDetail.data?.blogText}</p>
                        <div className="flex justify-between items-center mb-4">
                            <VoteButton blogId={blogId} userId={2} initialLikes={blogDetail.data?.voteUp} />
                        </div>
                        <div className="mb-4">
                            <div className="flex items-center">
                                <textarea
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder="Write your comment here..."
                                    className="w-full p-1 border-2 border-gray-300 mr-2 rounded-l-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm h-10"
                                />
                                <button onClick={handleCommentSubmit} className="px-2 py-1 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow transition duration-150 ease-in-out flex items-center h-10">
                                    <PaperAirplaneIcon className="h-4 w-4 mr-2 transform rotate-90" />
                                </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <ul>
                                {blogDetail.data?.blogComments?.map(comment => (
                                    <li key={comment.id} className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                                        <div className="flex items-center mb-2">
                                            <img src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${blogDetail.data?.photo}`} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
                                            <div>
                                                <p className="text-sm font-semibold">{comment.user.firstName} {comment.user.lastName}</p>
                                                <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-800">{comment.text}</p>
                                        <div className="flex items-center mb-2">
                                            <button className="flex items-center text-sm text-blue-500 mr-4">
                                                <ThumbUpIcon className="w-4 h-4 mr-1" /> {comment.voteUp}
                                            </button>
                                            <button onClick={() => setActiveComment(comment.id)} className="text-sm text-blue-500">Reply</button>
                                        </div>
                                        {activeComment === comment.id && (
                                            <div className="mt-2 ml-4">
                                                <textarea
                                                    value={replyText}
                                                    onChange={(e) => setReplyText(e.target.value)}
                                                    placeholder="Write your reply here..."
                                                    className="w-full p-2 border rounded mb-2"
                                                />
                                                <div className="flex justify-end">
                                                    <button onClick={() => handleReplySubmit(comment.id)} className="px-4 py-2 bg-blue-500 text-white rounded">Submit Reply</button>
                                                </div>
                                            </div>
                                        )}
                                        {comment.replies && comment.replies.length > 0 && (
                                            <ul className="ml-4 mt-2">
                                                {comment.replies.map(reply => (
                                                    <li key={reply.id} className="mb-2 p-2 bg-gray-100 rounded-lg shadow-sm">
                                                        <div className="flex items-center mb-2">
                                                            <img src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${blogDetail.data?.photo}`} alt="Avatar" className="w-6 h-6 rounded-full mr-2" />
                                                            <div>
                                                                <p className="text-xs font-semibold">{reply.user.firstName} {reply.user.lastName}</p>
                                                                <p className="text-xs text-gray-500">{new Date(reply.createdAt).toLocaleDateString()}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center mb-2">
                                                            <button className="flex items-center text-sm text-blue-500 mr-4">
                                                                <ThumbUpIcon className="w-4 h-4 mr-1" /> {reply.voteUp}
                                                            </button>
                                                            <button onClick={() => setActiveComment(comment.id)} className="text-sm text-blue-500">Reply</button>
                                                        </div>
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
            <div className="w-1/4 p-4">
                <Sidebar />
            </div>
        </div>
    );
};

export default BlogDetail;
