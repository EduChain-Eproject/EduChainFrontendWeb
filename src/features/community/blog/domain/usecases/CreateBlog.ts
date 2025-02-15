import { BlogRepository } from '../repositories/BlogRepository';

export default class CreateBlog {
    constructor(private blogRepository: BlogRepository) { }

    async execute(blogData: CreateBlogReq) {
        return await this.blogRepository.createBlog(blogData);
    }
}

export type CreateBlogReq = {
  title: string;
  userId: number;
  blogCategoryId: number;
  blogText: string;
  photo: File | null;
};