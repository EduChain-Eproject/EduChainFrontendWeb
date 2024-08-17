import { updateBlogComment } from './../../presentation/redux/BlogCommentActions';
import { BlogComment } from '../../../../../common/entities/BlogComment';

import { CreateBlogCommentReq } from '../usecases/CreateBlogComment';
import { UpdateBlogCommentReq } from '../usecases/UpdateBlogComment';

export interface BlogCommentRepository {
  getBlogsComment(blogId: number): Promise<{
    data?: BlogComment[];
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }>;
  // getBlog: (blogId: number) => Promise<{ data?: Blog; error?: string }>;
  createBlogComment: (courseData: CreateBlogCommentReq) => Promise<{
    data?: BlogComment;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }>;

  updateBlogComment(
    id: number,
    req: UpdateBlogCommentReq,
  ): Promise<{
    data?: BlogComment;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }>;

  deleteBlogComment(blogId: number): Promise<{
    data?: any;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }>;
}
