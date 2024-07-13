import { BlogComment } from "/Users/duc/Documents/DEV/Project/EduChainFrontendWeb/src/features/community/blogComment/domain/entities/BlogComment";

export default class Blog {
    id: number;
    createdAt: Date;
    title: string;
    blogText: string;
    voteUp: number;
    voteDown: number;
    photo: string;
    userId: number;
    blogCategoryId: number;
    comments: BlogComment[];
}