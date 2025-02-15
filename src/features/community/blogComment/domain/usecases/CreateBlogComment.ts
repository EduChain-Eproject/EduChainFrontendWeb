import { BlogCommentRepository } from '../repositories/BlogCommentRepository';
import { createBlogComment } from '../../presentation/redux/BlogCommentActions';

export default class CreateBlogComment {
  constructor(private blogRepository: BlogCommentRepository) {}

  async execute(blogData: CreateBlogCommentReq) {
    return await this.blogRepository.createBlogComment(blogData);
  }
}

export type CreateBlogCommentReq = {
  text: string;
  parentCommentId: string;
  blogId: number;
};
