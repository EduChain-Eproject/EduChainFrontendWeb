import { BlogRepository } from '../repositories/BlogRepository';

export default class UpdateBlog {
    constructor(private blogRepository: BlogRepository) { }

    async execute(blogId: number, blogData: UpdateBlogReq) {
        return await this.blogRepository.updateBlog(blogId, blogData);
    }
}

export type UpdateBlogReq = {

}