import Failure from '../../../../../common/entities/Failure';
import Blog from '../../domain/entities/blog';
import { BlogRepository } from '../../domain/repositories/BlogRepository';
import { CreateBlogReq } from '../../domain/usecases/CreateBlog';
import { TakeBlogsReq } from '../../domain/usecases/GetBlogs';
import { UpdateBlogReq } from '../../domain/usecases/UpdateBlog';
import {
  apiFetchBlog,
  apiFetchBlogs,
  apiCreateBlog,
  apiUpdateBlog,
  apiDeleteBlog,
} from '../dataSources/BlogRemoteDataSource';

class BlogRepositoryImpl implements BlogRepository {
  async getBlogs(req: TakeBlogsReq): Promise<{
    totalPages: number;
    totalElements: number;
    data?: Blog[];
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }> {
    try {
      const response = await apiFetchBlogs(req);
      console.log(response.content);
      return {
        totalPages: response.totalPages,
        totalElements: response.totalElements,
        data: response.content,
      };
    } catch (error) {
      if (error instanceof Failure) {
        return {
          totalPages: 0,
          totalElements: 0,
          error: {
            message: error.message,
            errors: error.errors,
            timestamp: error.timestamp,
          },
        };
      }
      return {
        totalPages: 0,
        totalElements: 0,
        error: {
          message: 'Unexpected error occurred on login',
          errors: { message: 'Unexpected error occurred' },
        },
      };
    }
  }

  async getBlog(blogId: number): Promise<{
    data?: Blog;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }> {
    try {
      const response = await apiFetchBlog(blogId);
      console.log(response);
      return response;
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
  async createBlog(blogData: CreateBlogReq): Promise<{
    data?: Blog;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }> {
    try {
      const response = await apiCreateBlog(blogData);
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

  async updateBlog(
    blogId: number,
    blogData: UpdateBlogReq,
  ): Promise<{ data?: Blog; error?: string }> {
    try {
      const response = await apiUpdateBlog(blogId, blogData);
      return { data: response };
    } catch (error) {
      if (error instanceof Failure) {
        return { error: error.message };
      }
      return { error: 'Unexpected error occurred' };
    }
  }

  async deleteBlog(blogId: number): Promise<{ data?: void; error?: string }> {
    try {
      const response = await apiDeleteBlog(blogId);
      return { data: response };
    } catch (error) {
      if (error instanceof Failure) {
        return { error: error.message };
      }
      return { error: 'Unexpected error occurred' };
    }
  }
}

export default BlogRepositoryImpl;