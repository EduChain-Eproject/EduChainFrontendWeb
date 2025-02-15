import { BlogCommentRepository } from '../repositories/BlogCommentRepository';

export default class DeleteBlogComment {
  constructor(private blogRepository: BlogCommentRepository) {}

  async execute(blogId: number) {
    return await this.blogRepository.deleteBlogComment(blogId);
  }
}
