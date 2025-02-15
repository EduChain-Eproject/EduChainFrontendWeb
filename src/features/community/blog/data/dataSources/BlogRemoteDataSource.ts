import axios from 'axios';
import axiosService from '../../../../../common/services/axiosService'
import Failure from '../../../../../common/entities/Failure';
import Blog from '../../domain/entities/blog';
import { CreateBlogReq } from '../../domain/usecases/CreateBlog';
import { UpdateBlogReq } from '../../domain/usecases/UpdateBlog';
import { TakeBlogsReq } from '../../domain/usecases/GetBlogs';

export const apiFetchBlogs = async (
  req: TakeBlogsReq,
): Promise<{
  totalPages: number;
  totalElements: number;
  content: Blog[];
}> => {
  try {
    //const response = await axiosService.get('/api/blog');
    const response = await axios.post(
      'http://localhost:8080/api/blog/fetch',
      req,
    );
    // const response = await fetch("http://localhost:5000/api/blog").then(res => res.json())
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

export const apiFetchBlog = async (
  blogId: number,
): Promise<{
  data: Blog;
}> => {
  try {
    // const response = await axiosService.get(`/api/blog/${blogId}`);
    const response = await axiosService.get(
      `http://localhost:8080/api/blog/${blogId}`,
    );

    return response;
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

const toFormData = (blogData: CreateBlogReq): FormData => {
  const formData = new FormData();
  formData.append('title', blogData.title);
  formData.append('userId', blogData.userId.toString());
  formData.append('blogCategoryId', blogData.blogCategoryId.toString());
  formData.append('blogText', blogData.blogText);
  if (blogData.photo) {
    formData.append('photo', blogData.photo);
  }
  return formData;
};
export const apiCreateBlog = async (blogData: CreateBlogReq) => {
  try {
    // const response = await axiosService.post('/api/blog', blogData);
    const formData = toFormData(blogData);
    const response = await axiosService.post(
      'http://localhost:8080/api/blog/create',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
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

export const apiUpdateBlog = async (
  blogId: number,
  blogData: UpdateBlogReq,
) => {
  try {
    const response = await axiosService.put(`/api/blog/${blogId}`, blogData);
    return response.data;
  } catch (error) {
    throw new Failure(error.response.data.message, error.response.status);
  }
};

export const apiDeleteBlog = async (blogId: number) => {
  try {
    // const response = await axiosService.delete(`/api/blog/${blogId}`);
    const response = await axiosService.delete(
      `http://localhost:8080/api/blog/${blogId}`,
    );
    return response.data;
  } catch (error) {
    throw new Failure(error.response.data.message, error.response.status);
  }
};

