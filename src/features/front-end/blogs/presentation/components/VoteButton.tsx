import React, { useEffect, useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../../../../common/context/store';
import { voteBlog } from '../../data/redux/action/voteBlog';
import { userVoteBlog } from '../../data/redux/action/fetchUserVoteBlog';
import { ThumbUpIcon } from '@heroicons/react/outline';

const VoteButton = ({ userId, blogId, initialLikes }) => {
    const dispatch = useAppDispatch();
    const userBlogVote = useAppSelector((state: RootState) => state.blogUiSlice.userBlogVote);
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(initialLikes);

    useEffect(() => {
        dispatch(userVoteBlog({ userId, blogId }));
    }, [dispatch, userId, blogId]);

    useEffect(() => {
        if (userBlogVote[blogId]) {
            setLiked(userBlogVote[blogId]);
        }
    }, [userBlogVote, blogId]);

    const handleVote = async () => {
        try {
            const vote = liked ? 0 : 1;
            await dispatch(voteBlog({ userId, blogId, vote }));
            setLiked(!liked);
            setLikesCount(prevCount => prevCount + (vote ? 1 : -1));
        } catch (error) {
            console.error('Error voting blog:', error);
        }
    };
    

    return (
        <button
            onClick={handleVote}
            className={`text-white px-4 py-2 rounded-lg flex items-center w-full justify-center ${liked ? 'bg-red-500' : 'bg-blue-500'}`}
        >
            <ThumbUpIcon className="h-5 w-5 text-white" /> <p>{likesCount}</p>
        </button>
    );
};

export default VoteButton;