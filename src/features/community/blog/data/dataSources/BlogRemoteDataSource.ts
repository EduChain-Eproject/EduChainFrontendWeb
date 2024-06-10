import axiosService from '../../../../../common/services/axiosService'
import Failure from '../../../../../common/types/Failure';
import Blog from '../../domain/entities/blog';
import { CreateBlogReq } from '../../domain/usecases/CreateBlog';
import { UpdateBlogReq } from '../../domain/usecases/UpdateBlog';

export const apiFetchBlogs: () => Promise<Blog[]> = async () => {
    try {
        const response = await axiosService.get('/api/blog');
        return response.data;
    } catch (error) {
        throw new Failure(error.response.data.message, error.response.status);
    }
};

export const apiFetchBlog = async (blogId: number) => {
    try {
        const response = await axiosService.get(`/api/blog/${blogId}`);
        return response.data;
    } catch (error) {
        throw new Failure(error.response.data.message, error.response.status);
    }
};

export const apiCreateBlog = async (blogData: CreateBlogReq) => {
    try {
        const response = await axiosService.post('/api/blog', blogData);
        return response.data;
    } catch (error) {
        throw new Failure(error.response.data.message, error.response.status);
    }
};

export const apiUpdateBlog = async (blogId: number, blogData: UpdateBlogReq) => {
    try {
        const response = await axiosService.put(`/api/blog/${blogId}`, blogData);
        return response.data;
    } catch (error) {
        throw new Failure(error.response.data.message, error.response.status);
    }
};

export const apiDeleteBlog = async (blogId: number) => {
    try {
        const response = await axiosService.delete(`/api/blog/${blogId}`);
        return response.data;
    } catch (error) {
        throw new Failure(error.response.data.message, error.response.status);
    }
};

