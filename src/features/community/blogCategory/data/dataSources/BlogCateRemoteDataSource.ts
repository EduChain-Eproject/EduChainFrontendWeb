import axios from 'axios';
import axiosService from '../../../../../common/services/axiosService'
import Failure from '../../../../../common/entities/Failure';
import { BlogCategory } from '../../domain/entities/BlogCategory';
import { CreateCateReq } from '../../domain/usecases/CreateCate';
import { UpdateCateReq } from '../../domain/usecases/UpdateCate';

const baseUrl = 'http://localhost:8080/';
export const apiFetchCates: () => Promise<BlogCategory[]> = async () => {
  try {
    // const response = await axiosService.get('api/blog_category');
    const response = await axios.get(`${baseUrl}api/blog_category`);
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

export const apiFetchCate = async (blogId: number) => {
  try {
    // const response = await axiosService.get(`api/blog_category/${blogId}`);
    const response = await axiosService.get(
      `${baseUrl}api/blog_category/${blogId}`,
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

export const apiCreateCate = async (cateData: CreateCateReq) => {
  try {
    console.log(cateData);

    // const response = await axiosService.post('/api/blog_category', cateData);
    const response = await axiosService.post(
      `${baseUrl}api/blog_category`,
      cateData,
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
export const apiUpdateCate = async (
  cateId: number,
  cateData: UpdateCateReq,
) => {
  try {
    // const response = await axiosService.put(`/api/blog_category/${cateId}`, cateData);
    const response = await axiosService.put(
      `${baseUrl}api/blog_category/${cateId}`,
      cateData,
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

export const apiDeleteCate = async (cateId: number) => {
  try {
    const response = await axiosService.delete(
      `${baseUrl}api/blog_category/${cateId}`,
    );
    return response.data;
  } catch (error) {
    throw new Failure(error.response.data.message, error.response.status);
  }
};

