import React, { useEffect, useState } from 'react';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../../../../common/context/store';
import { fetchBlog } from '../../data/redux/action/fetchBlog';
import { useParams } from 'react-router-dom';
import VoteButton from './VoteButton';
import {
  ThumbUpIcon,
  PaperAirplaneIcon,
  ThumbDownIcon,
} from '@heroicons/react/outline';
import { Sidebar } from './Sidebar';
import {
  CreateBlogCommentReq,
  createComment,
} from '../../data/redux/action/CreateComment';
import { editComment, UpdateCommentReq } from '../../data/redux/action/EditComment';
import { deleteComment } from '../../data/redux/action/DeleteComent';

const BlogDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector(
    (state: RootState) => state.blogUiSlice.blogDetail,
  );
  const { blogId } = useParams<{ blogId: string }>();

  const [commentText, setCommentText] = useState<string>('');
  const [replyText, setReplyText] = useState<string>('');
  const [activeComment, setActiveComment] = useState<number | null>(null);
  const userId = useAppSelector((s) => s.auth.user?.id);
  const [refreshComments, setRefreshComments] = useState(false);

  useEffect(() => {
    const id = blogId ? Number(blogId) : Number(localStorage.getItem('blogId'));
    if (id) {
      dispatch(fetchBlog(id));
      localStorage.setItem('blogId', id.toString());
    }
  }, [dispatch, blogId, refreshComments]);

  console.log(blogId);

  //create comment
  const handleCommentSubmit = () => {
    if (!commentText.trim()) {
      return;
    }
    const id = blogId ? Number(blogId) : Number(localStorage.getItem('blogId'));
    const commentData: CreateBlogCommentReq = {
      text: commentText,
      parentCommentId: '',
      blogId: id!,
    };

    dispatch(createComment(commentData))
      .unwrap()
      .then((response) => {
        console.log('Comment submitted successfully:', response);
        setCommentText('');
        setRefreshComments((prev) => !prev);
      })
      .catch((error) => {
        console.error('Error submitting comment:', error);
      });
  };
  //edit comment
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editCommentText, setEditCommentText] = useState<string>('');
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const handleEditComment = (commentId: number, text: string) => {
    setEditCommentId(commentId);
    setEditCommentText(text);
    setShowEditModal(true);
  };

  const handleEditSubmit = () => {
    console.log(editCommentText);
    if (!editCommentText.trim()) {
      return;
    }
    const id = editCommentId!;
    const req: UpdateCommentReq = {
      text: editCommentText,
    };

    dispatch(editComment({ id, req }))
      .unwrap()
      .then((response) => {
        console.log('Comment submitted successfully:', response);
        setCommentText('');
        setRefreshComments((prev) => !prev);
      });

    console.log('Edited comment:', editCommentId, editCommentText);
    setShowEditModal(false);
  };
  //reply
  const handleReplySubmit = (commentId: number) => {
    if (!replyText.trim()) {
      return;
    }
    const id = blogId ? Number(blogId) : Number(localStorage.getItem('blogId'));
    const commentData: CreateBlogCommentReq = {
      text: replyText,
      parentCommentId: commentId.toString(),
      blogId: id!,
    };
    dispatch(createComment(commentData))
      .unwrap()
      .then((response) => {
        console.log('Comment submitted successfully:', response);
        setCommentText('');
        setRefreshComments((prev) => !prev);
      })
      .catch((error) => {
        console.error('Error submitting comment:', error);
      });
    console.log('Submitted reply:', replyText, 'for comment:', commentId);
    setReplyText('');
    setActiveComment(null);
  };
  //delete
  const handleDeleteComment = (commentId: number) => {
    console.log(`Delete comment with ID: ${commentId}`);
    dispatch(deleteComment(commentId))
      .unwrap()
      .then(() => {
        setRefreshComments((prev) => !prev);
      });
  };


  return (
    <div className="container mx-auto p-4 flex">
      <div className="w-3/4 p-4">
        {status === 'loading' && (
          <p className="text-center text-gray-500">Loading...</p>
        )}
        {status === 'failed' && (
          <p className="text-center text-red-500">Failed to fetch blogs</p>
        )}
        {status === 'succeeded' && data && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <img
                  src={data.user.avatarPath}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full mr-3"
                />
              </div>
            </div>
            <h2 className="text-xl font-bold mb-4">{data?.title}</h2>
            <img
              src={`${
                import.meta.env.VITE_API_BASE_URL
              }/uploads/${data?.photo}`}
              alt={data?.title}
              className="w-full h-64 object-cover mb-4 rounded-lg"
            />
            <p className="text-gray-700 mb-6">{data?.blogText}</p>
            <div className="flex justify-between items-center mb-4">
              <VoteButton
                blogId={blogId!}
                userId={userId!}
                initialLikes={data?.userBlogVotes}
              />
            </div>
            <div className="mb-4">
              <div className="flex items-center">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write your comment here..."
                  className="w-full p-1 border-2 border-gray-300 mr-2 rounded-l-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm h-10"
                />
                <button
                  onClick={handleCommentSubmit}
                  className="px-2 py-1 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow transition duration-150 ease-in-out flex items-center h-10"
                >
                  <PaperAirplaneIcon className="h-4 w-4 mr-2 transform rotate-90" />
                </button>
              </div>
            </div>
            <div className="mb-4">
              <ul>
                {data?.blogComments?.map((comment) => (
                  <li
                    key={comment.id}
                    className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center mb-2">
                      <img
                        src={comment.user.avatarPath}
                        alt="Avatar"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <div>
                        <p className="text-sm font-semibold">
                          {comment.user.firstName} {comment.user.lastName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-800">{comment.text}</p>
                    <div className="flex items-center mb-2">
                      {userId === comment.user?.id && (
                        <button
                          onClick={() =>
                            handleEditComment(comment.id, comment.text)
                          }
                          className="flex items-center text-sm text-blue-500 mr-4"
                        >
                          Edit
                        </button>
                      )}
                              <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="flex items-center text-sm text-blue-500 mr-4"
                        >
                          delete
                        </button>
                      <button
                        onClick={() => setActiveComment(comment.id)}
                        className="text-sm text-blue-500"
                      >
                        Reply
                      </button>
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
                          <button
                            onClick={() => handleReplySubmit(comment.id)}
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                          >
                            Submit Reply
                          </button>
                        </div>
                      </div>
                    )}
                    {comment.replies && comment.replies.length > 0 && (
                      <ul className="ml-4 mt-2">
                        {comment.replies && comment.replies.length > 0 && (
                        <ul className="ml-4 mt-2">
                          {comment.replies.map((reply) => (
                            <li
                              key={reply.id}
                              className="mb-2 p-2 bg-gray-100 rounded-lg shadow-sm"
                            >
                              <div className="flex items-center mb-2">
                                <img
                                  src={comment.user?.avatarPath}
                                  alt="Avatar"
                                  className="w-6 h-6 rounded-full mr-2"
                                />
                                <div>
                                  <p className="text-xs font-semibold">
                                    {reply.user?.firstName}{' '}
                                    {reply.user?.lastName}
                                  </p>
                                  <p className="text-xs font-semibold">
                                    {reply.text}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {new Date(
                                      reply.createdAt,
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center mb-2">
                                {userId === comment.user?.id && (
                                  <button
                                    onClick={() =>
                                      handleEditComment(reply.id, reply.text)
                                    }
                                    className="flex items-center text-sm text-blue-500 mr-4"
                                  >
                                    Edit
                                  </button>
                                )}

                                <button
                                  onClick={() => handleDeleteComment(reply.id)}
                                  className="flex items-center text-sm text-blue-500 mr-4"
                                >
                                  delete
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                      </ul>
                    )}
                  </li>
                )) || []}
              </ul>
            </div>
          </div>
        )}
        {/* Edit Comment Modal */}
        {showEditModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-white w-11/12 md:max-w-md rounded-lg shadow-lg z-30 overflow-y-auto p-6">
              <div className="relative">
                <span
                  className="absolute top-2 right-2 cursor-pointer text-2xl"
                  onClick={() => setShowEditModal(false)}
                >
                  &times;
                </span>
                <h2 className="text-lg font-semibold mb-4">Edit Comment</h2>
                <textarea
                  value={editCommentText}
                  onChange={(e) => setEditCommentText(e.target.value)}
                  className="w-full p-2 border rounded mb-4 h-32"
                  placeholder="Edit your comment here..."
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleEditSubmit}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Save
                  </button>
                </div>
              </div>
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
