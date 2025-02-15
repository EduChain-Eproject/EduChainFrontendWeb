import { updateBlogComment } from './../../presentation/redux/BlogCommentActions';
import {
  apiCreateBlogComment,
  apiDeleteBlogComment,
  apiFetchBlogsComment,
  apiUpdateBlogComment,
} from '../dataSources/BlogCommentDataSource';
import { BlogComment } from '../../../../../common/entities/BlogComment';
import Failure from '../../../../../common/entities/Failure';

import { CreateBlogCommentReq } from '../../domain/usecases/CreateBlogComment';
import { BlogCommentRepository } from '../../domain/repositories/BlogCommentRepository';
import { UpdateBlogCommentReq } from '../../domain/usecases/UpdateBlogComment';

class BlogCommentRepositoryImpl implements BlogCommentRepository {
  async getBlogsComment(blogId: number): Promise<{
    data?: BlogComment[];
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }> {
    try {
      const response = await apiFetchBlogsComment(blogId);
      return { data: response };
    } catch (error) {
      if (error instanceof Failure) {
        return {
          error: {
            message: error.message,
            errors: error.errors,
            timestamp: error.timestamp,
          },
        };
      }
      return {
        error: {
          message: 'Unexpected error occurred on login',
          errors: { message: 'Unexpected error occurred' },
        },
      };
    }
  }

  async createBlogComment(blogData: CreateBlogCommentReq): Promise<{
    data?: BlogComment;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }> {
    try {
      const response = await apiCreateBlogComment(blogData);
      return { data: response };
    } catch (error) {
      if (error instanceof Failure) {
        return {
          error: {
            message: error.message,
            errors: error.errors,
            timestamp: error.timestamp,
          },
        };
      }
      return {
        error: {
          message: 'Unexpected error occurred on login',
          errors: { message: 'Unexpected error occurred' },
        },
      };
    }
  }

  async updateBlogComment(
    id: number,
    req: UpdateBlogCommentReq,
  ): Promise<{
    data?: BlogComment;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }> {
    try {
      const response = await apiUpdateBlogComment(id, req);
      return { data: response };
    } catch (error) {
      if (error instanceof Failure) {
        return {
          error: {
            message: error.message,
            errors: error.errors,
            timestamp: error.timestamp,
          },
        };
      }
      return {
        error: {
          message: 'Unexpected error occurred on login',
          errors: { message: 'Unexpected error occurred' },
        },
      };
    }
  }

  async deleteBlogComment(blogId: number): Promise<{
    data?: boolean;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }> {
    try {
      const response = await apiDeleteBlogComment(blogId);
      return { data: response };
    } catch (error) {
      if (error instanceof Failure) {
        return {
          error: {
            message: error.message,
            errors: error.errors,
            timestamp: error.timestamp,
          },
        };
      }
      return {
        error: {
          message: 'Unexpected error occurred on login',
          errors: { message: 'Unexpected error occurred' },
        },
      };
    }
  }
}

export default BlogCommentRepositoryImpl;
