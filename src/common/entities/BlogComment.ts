import { Blog } from "./Blog";
import { User } from "./User";

export class BlogComment {
    id: number;
    createdAt: Date;
    text: string;
    voteUp: number;
    user: User;
    blog: Blog;
    parrentCommentId: BlogComment;
    replies: BlogComment[];
}