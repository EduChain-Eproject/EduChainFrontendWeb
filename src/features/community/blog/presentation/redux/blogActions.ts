import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import BlogRepositoryImpl from '../../data/repositoryImpl/BlogRepositoryImpl';
import {
  GetBlog,
  GetBlogs,
  CreateBlog,
  UpdateBlog,
  DeleteBlog,
} from '../../domain/usecases';

import { BlogRepository } from '../../domain/repositories/BlogRepository';
import { CreateBlogReq } from '../../domain/usecases/CreateBlog';
import { TakeBlogsReq } from '../../domain/usecases/GetBlogs';

const blogRepository: BlogRepository = new BlogRepositoryImpl();

export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async (req: TakeBlogsReq) => {
    const getBlogsUseCase = new GetBlogs(blogRepository);
    return await getBlogsUseCase.execute(req);
  },
);

export const fetchBlog = createAsyncThunk(
  'blogs/fetchBlog',
  async (blogId: number) => {
    const getBlogUseCase = new GetBlog(blogRepository);
    return await getBlogUseCase.execute(blogId);
  },
);

export const createBlog = createAsyncThunk(
  'blogs/createBlog',
  async (blogData: CreateBlogReq) => {
    const createBlogUseCase = new CreateBlog(blogRepository);
    return await createBlogUseCase.execute(blogData);
  },
);

export const updateBlog = createAsyncThunk(
  'blogs/updateBlogs',
  async ({ blogId, blogData }: { blogId: number; blogData: any }) => {
    const updateBlogUseCase = new UpdateBlog(blogRepository);
    return await updateBlogUseCase.execute(blogId, blogData);
  },
);

export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (blogId: number) => {
    const deleteBlogUseCase = new DeleteBlog(blogRepository);
    return await deleteBlogUseCase.execute(blogId);
  },
);

export const resetcreateBlog = createAction('blogs/resetCreateBlog');
export const resetUpdateBlog = createAction('blogs/resetUpdateBlog');
