import axiosService from '../../../../../common/services/axiosService';
import Failure from '../../../../../common/entities/Failure';

import { CreateBlogCommentReq } from '../../domain/usecases/CreateBlogComment';

import { BlogComment } from '../../../../../common/entities/BlogComment';
import { UpdateBlogCommentReq } from '../../domain/usecases/UpdateBlogComment';

export const apiFetchBlogsComment = async (
  blogId: number,
): Promise<BlogComment[]> => {
  try {
    //const response = await axiosService.get('/api/blog');
    const response = await axiosService.get(
      `http://localhost:8080/api/blog_comment/blog/${blogId}`,
    );
    console.log(response);
    return response.data;
  } catch (error) {
    if (error.response) {
      const data = error.response.data;
      const message = data.errors.message || 'Validation error';
      const errors = data.errors;

      throw new Failure(message, errors, data.timestamp);
    }
    throw new Failure('An unknown error occurred', {
      message: 'An unknown error occurred',
    });
  }
};

export const apiCreateBlogComment = async (
  blogData: CreateBlogCommentReq,
): Promise<BlogComment> => {
  try {
    const response = await axiosService.post(
      'http://localhost:8080/api/blog_comment/create',
      blogData,
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const data = error.response.data;
      const message = data.errors.message || 'Validation error';
      const errors = data.errors;

      throw new Failure(message, errors, data.timestamp);
    }
    throw new Failure('An unknown error occurred', {
      message: 'An unknown error occurred',
    });
  }
};

export const apiUpdateBlogComment = async (
  id: number,
  req: UpdateBlogCommentReq,
): Promise<BlogComment> => {
  try {
    const response = await axiosService.put(
      `http://localhost:8080/api/blog_comment/${id}`,
      req,
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const data = error.response.data;
      const message = data.errors.message || 'Validation error';
      const errors = data.errors;

      throw new Failure(message, errors, data.timestamp);
    }
    throw new Failure('An unknown error occurred', {
      message: 'An unknown error occurred',
    });
  }
};

export const apiDeleteBlogComment = async (commentId: number) => {
  try {
    const response = await axiosService.delete(
      `http://localhost:8080/api/blog_comment/${commentId}`,
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const data = error.response.data;
      const message = data.errors.message || 'Validation error';
      const errors = data.errors;

      throw new Failure(message, errors, data.timestamp);
    }
    throw new Failure('An unknown error occurred', {
      message: 'An unknown error occurred',
    });
  }
};
