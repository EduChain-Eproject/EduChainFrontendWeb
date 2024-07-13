import Blog from "../entities/blog";
import { CreateBlogReq } from "../usecases/CreateBlog";
import { UpdateBlogReq } from "../usecases/UpdateBlog";

export interface BlogRepository {
    getBlogs: () => Promise<{ data?: Blog[]; error?: string }>;
    getBlog: (blogId: number) => Promise<{ data?: Blog; error?: string }>;
    createBlog: (courseData: CreateBlogReq) => Promise<{ data?: Blog; error?: string }>;
    updateBlog: (blogId: number, courseData: UpdateBlogReq) => Promise<{ data?: Blog; error?: string }>;
    deleteBlog: (blogId: number) => Promise<{ data?: void; error?: string }>;
}  