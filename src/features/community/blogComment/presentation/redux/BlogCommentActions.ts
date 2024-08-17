import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import BlogRepositoryImpl from '../../data/repositoryImpl/BlogCommentRepositoryImpl';

import CreateBlogComment, {
  CreateBlogCommentReq,
} from '../../domain/usecases/CreateBlogComment';
import { BlogCommentRepository } from '../../domain/repositories/BlogCommentRepository';
import GetBlogsComment from '../../domain/usecases/GetBlogsComment';
import UpdateBlogComment, {
  UpdateBlogCommentReq,
} from '../../domain/usecases/UpdateBlogComment';
import DeleteBlogComment from '../../domain/usecases/DeleteBlogComment';

const blogRepository: BlogCommentRepository = new BlogRepositoryImpl();

export const fetchBlogsComment = createAsyncThunk(
  'blogs/fetchBlogsComment',
  async (blogId: number) => {
    const getBlogsUseCase = new GetBlogsComment(blogRepository);
    return await getBlogsUseCase.execute(blogId);
  },
);

// export const fetchBlogComment = createAsyncThunk('blogs/fetchBlog', async (blogId: number) => {
//     const getBlogUseCase = new GetBlog(blogRepository);
//     return await getBlogUseCase.execute(blogId);
// });

export const createBlogComment = createAsyncThunk(
  'blogs/createBlogComment',
  async (blogData: CreateBlogCommentReq) => {
    const createBlogUseCase = new CreateBlogComment(blogRepository);
    return await createBlogUseCase.execute(blogData);
  },
);

export const updateBlogComment = createAsyncThunk(
  'blogs/updateBlogsComment',
  async ({ id, req }: { id: number; req: UpdateBlogCommentReq }) => {
    const updateBlogUseCase = new UpdateBlogComment(blogRepository);
    return await updateBlogUseCase.execute(id, req);
  },
);

export const deleteBlogComment = createAsyncThunk(
  'blogs/deleteBlog',
  async (blogId: number) => {
    const deleteBlogUseCase = new DeleteBlogComment(blogRepository);
    return await deleteBlogUseCase.execute(blogId);
  },
);

export const resetcreateBlogComment = createAction('blogs/createBlog');
