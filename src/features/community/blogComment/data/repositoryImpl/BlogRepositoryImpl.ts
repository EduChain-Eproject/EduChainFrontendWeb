import Failure from '../../../../../common/types/Failure';
import Blog from '../../domain/entities/blog';
import { BlogRepository } from '../../domain/repositories/BlogRepository';
import { CreateBlogReq } from '../../domain/usecases/CreateBlog';
import { UpdateBlogReq } from '../../domain/usecases/UpdateBlog';
import { apiFetchBlog, apiFetchBlogs, apiCreateBlog, apiUpdateBlog, apiDeleteBlog } from '../dataSources/BlogRemoteDataSource';

class BlogRepositoryImpl implements BlogRepository {
    async getBlogs(): Promise<{ data?: Blog[]; error?: string }> {
        try {
            const response = await apiFetchBlogs();
            return { data: response };
        } catch (error) {
            if (error instanceof Failure) {
                return { error: error.message };
            }
            return { error: 'Unexpected error occurred' };
        }
    }

    async getBlog(blogId: number): Promise<{ data?: Blog; error?: string }> {
        try {
            const response = await apiFetchBlog(blogId);
            return { data: response };
        } catch (error) {
            if (error instanceof Failure) {
                return { error: error.message };
            }
            return { error: 'Unexpected error occurred' };
        }
    }

    async createBlog(blogData: CreateBlogReq): Promise<{ data?: Blog; error?: string }> {
        try {
            const response = await apiCreateBlog(blogData);
            return { data: response };
        } catch (error) {
            if (error instanceof Failure) {
                return { error: error.message };
            }
            return { error: 'Unexpected error occurred' };
        }
    }

    async updateBlog(blogId: number, blogData: UpdateBlogReq): Promise<{ data?: Blog; error?: string }> {
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