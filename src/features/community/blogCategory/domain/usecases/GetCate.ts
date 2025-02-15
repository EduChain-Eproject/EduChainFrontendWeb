import { BlogCateRepository } from "../repositories/BlogCateRepository";

export default class GetCate {
    constructor(private blogCateRepository: BlogCateRepository) { }


    async execute(blogId: number) {
        return await this.blogCateRepository.getCate(blogId);
    }
}
