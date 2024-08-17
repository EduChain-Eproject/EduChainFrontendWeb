import { BlogCommentRepository } from '../repositories/BlogCommentRepository';

export default class GetBlogsComment {
  constructor(private blogRepository: BlogCommentRepository) {}

  async execute(blogId: number) {
    return await this.blogRepository.getBlogsComment(blogId);
  }
}
