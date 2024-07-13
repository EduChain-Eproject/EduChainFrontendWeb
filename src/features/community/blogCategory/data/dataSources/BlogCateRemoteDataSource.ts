import axios from 'axios';
import axiosService from '../../../../../common/services/axiosService'
import Failure from '../../../../../common/types/Failure';
import { BlogCategory } from '../../domain/entities/BlogCategory';
import { CreateCateReq } from '../../domain/usecases/CreateCate';
import { UpdateCateReq } from '../../domain/usecases/UpdateCate';

export const apiFetchCates: () => Promise<BlogCategory[]> = async () => {
    try {
        const response = await axiosService.get('api/blog_category');
        //const response = await axios.get('http://localhost:8080/api/blog');
        return response.data;
    } catch (error) {
        throw new Failure(error.response.data.message, error.response.status);
    }
};

export const apiFetchCate = async (blogId: number) => {
    try {
        const response = await axiosService.get(`api/blog_category/${blogId}`);
        return response.data;
    } catch (error) {
        throw new Failure(error.response.data.message, error.response.status);
    }
};

export const apiCreateCate = async (cateData: CreateCateReq) => {
    try {
        console.log(cateData);

        const response = await axiosService.post('/api/blog_category', cateData);
        return response.data;
    } catch (error) {
        console.log(error);
        
        throw new Failure(error.response.data.error, error.response.status);
    }
};

export const apiUpdateCate = async (cateId: number, cateData: UpdateCateReq) => {
    try {
        const response = await axiosService.put(`/api/blog_category/${cateId}`, cateData);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);

        throw new Failure(error.response.data.error, error.response.status);
    }
};

export const apiDeleteCate = async (cateId: number) => {
    try {
        const response = await axiosService.delete(`/api/blog_category/${cateId}`);
        return response.data;
    } catch (error) {
        throw new Failure(error.response.data.message, error.response.status);
    }
};

