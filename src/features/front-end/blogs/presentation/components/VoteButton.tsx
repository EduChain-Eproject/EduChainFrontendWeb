import React, { useEffect, useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../../../../common/context/store';
import { voteBlog, VoteReq } from '../../data/redux/action/voteBlog';
import { ThumbUpIcon } from '@heroicons/react/outline';
import { UserBlogVote } from '../../data/model/UserBlogVote';
interface VoteButtonProps {
  blogId: string;
  userId: number;
  initialLikes?: UserBlogVote[]; // Made initialLikes optional
}

const VoteButton: React.FC<VoteButtonProps> = ({ blogId, userId, initialLikes = [] }) => { // Default to empty array if initialLikes is undefined
  console.log(userId)
  const dispatch = useAppDispatch();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes.length); // Initialize likeCount based on the length of initialLikes
  console.log(initialLikes.length)
  useEffect(() => {
    if (initialLikes.length > 0) {
      console.log('Initial Likes:', initialLikes); // Log the entire initialLikes array
  
      const hasVoted = initialLikes.some(vote => vote.userId === userId);
      if (hasVoted) {
        console.log('red');
        setLiked(true); // User has voted
      } else {
        console.log('blue');
        setLiked(false); // User has not voted
      }
    } else {
      console.log('blue');
      setLiked(false); // No votes, default to not liked
    }
  }, [initialLikes, userId]);

  const handleVote = async () => {
    try {
      const vote = liked ? 0 : 1;
      const id = blogId ? Number(blogId) : Number(localStorage.getItem('blogId'));

      // Optimistic UI update
      setLiked(!liked);
      setLikeCount(prevCount => (liked ? prevCount - 1 : prevCount + 1));

      const req: VoteReq = {
        blogId: id,
        userId,
        vote
      };

      const resultAction = await dispatch(voteBlog(req)).unwrap();

      // Update the state based on the result from the back-end
      setLikeCount(resultAction.voteUp);
      setLiked(resultAction.userBlogVotes.some((vote: any) => vote.userId === userId));
    } catch (error) {
      console.error('Error voting on blog:', error);

      // Revert optimistic UI update in case of an error
      setLiked(!liked);
      setLikeCount(initialLikes.length);
    }
  };

  return (
    <button
      onClick={handleVote}
      className={`text-white px-4 py-2 rounded-lg flex items-center w-full justify-center ${liked ? 'bg-red-500' : 'bg-blue-500'}`}
    >
      <ThumbUpIcon className="h-5 w-5 text-white" /> <p>{likeCount}</p>
    </button>
  );
};

export default VoteButton;
