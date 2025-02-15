import { BlogCommentRepository } from '../repositories/BlogCommentRepository';

export default class UpdateBlogComment {
  constructor(private blogRepository: BlogCommentRepository) {}

  async execute(id: number, blogData: UpdateBlogCommentReq) {
    return await this.blogRepository.updateBlogComment(id, blogData);
  }
}

export type UpdateBlogCommentReq = {
  text: string;
};
