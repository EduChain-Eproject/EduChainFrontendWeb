import { BlogRepository } from '../repositories/BlogRepository';

export default class DeleteBlog {
    constructor(private blogRepository: BlogRepository) { }

    async execute(blogId: number) {
        return await this.blogRepository.deleteBlog(blogId);
    }
}
