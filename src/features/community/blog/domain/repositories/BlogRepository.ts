import Blog from "../entities/blog";
import { CreateBlogReq } from "../usecases/CreateBlog";
import { TakeBlogsReq } from '../usecases/GetBlogs';
import { UpdateBlogReq } from '../usecases/UpdateBlog';

export interface BlogRepository {
  getBlogs(req: TakeBlogsReq): Promise<{
    totalPages: number;
    totalElements: number;
    data?: Blog[];
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }>;

  getBlog(blogId: number): Promise<{
    data?: Blog;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }>;

  createBlog: (courseData: CreateBlogReq) => Promise<{
    data?: Blog;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }>;

  updateBlog: (
    blogId: number,
    courseData: UpdateBlogReq,
  ) => Promise<{ data?: Blog; error?: string }>;

  deleteBlog: (blogId: number) => Promise<{ data?: void; error?: string }>;
}  