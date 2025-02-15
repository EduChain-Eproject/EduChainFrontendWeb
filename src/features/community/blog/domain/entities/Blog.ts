// import { BlogComment } from "/Users/duc/Documents/DEV/Project/EduChainFrontendWeb/src/features/community/blogComment/domain/entities/BlogComment";

import { BlogComment } from '../../../../../common/entities/BlogComment';
import User from '../../../../../common/entities/User';
import { BlogCategory } from '../../../blogCategory/domain/entities/BlogCategory';

export default class Blog {
  id: number;
  createdAt: string; // Use string for Date to match API response format
  title: string;
  blogText: string;
  voteUp: number;
  photo: string;
  user: User;
  blogCategory: BlogCategory;
  userBlogVotes: UserBlogVoteDTO[];
}

export interface UserBlogVoteDTO {
  id: number;
  userId: number;
  blogId: number;
}
