import React, { useEffect, useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../../../../common/context/store';
import { voteBlog } from '../../data/redux/action/voteBlog';
import { ThumbUpIcon } from '@heroicons/react/outline';

const VoteButton = ({ userId, blogId }) => {
    const dispatch = useAppDispatch();
    const blogDetail = useAppSelector((state: RootState) => state.blogUiSlice.blogDetail);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (blogDetail.data?.userBlogVotes) {
            const hasVoted = blogDetail.data.userBlogVotes.includes(userId);
            setLiked(hasVoted);
        }
    }, [blogDetail, blogId]);

    const handleVote = async () => {
        try {
            const vote = liked ? 0 : 1;
            await dispatch(voteBlog({ userId, blogId, vote }));
            setLiked(!liked);
        } catch (error) {
            console.error('Error voting blog:', error);
        }
    };

    return (
        <button
            onClick={handleVote}
            className={`text-white px-4 py-2 rounded-lg flex items-center w-full justify-center ${liked ? 'bg-red-500' : 'bg-blue-500'}`}
        >
            <ThumbUpIcon className="h-5 w-5 text-white" /> <p>{blogDetail.data?.voteUp}</p>
        </button>
    );
};

export default VoteButton;
