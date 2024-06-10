export class BlogComment {
    id: number;
    createdAt: Date;
    text: string;
    voteUp: number;
    voteDown: number;
    photo: string;
    userId: number;
    blogId: number;
    parentCommentId: number;
    replies: BlogComment[];
}