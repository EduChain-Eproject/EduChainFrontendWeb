import { Blog } from "./Blog";
import User from "./User";

export class UserBlogVote {
    id: number;
    user: User;
    blog: Blog;
}