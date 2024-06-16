import { BlogRepository } from '../repositories/BlogRepository';

export default class GetBlogs {
    constructor(private blogRepository: BlogRepository) { }

    async execute() {
        return await this.blogRepository.getBlogs();
    }
}
