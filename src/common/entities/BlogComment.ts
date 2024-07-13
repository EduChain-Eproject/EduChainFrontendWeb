import { Blog } from "./Blog";
import { User } from "./User";

export class BlogComment {
    id: number;
    createdAt: Date;
    text: string;
    voteDown: number;
    voteUp: number;
    photo: string;
    user: User;
    blog: Blog;
    parrentCommentId: BlogComment;
    replies: BlogComment[];
}