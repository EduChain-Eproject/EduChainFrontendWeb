import { BlogCateRepository } from "../repositories/BlogCateRepository";

export default class DeleteCate {
    constructor(private blogCateRepository: BlogCateRepository) { }

    async execute(cateId: number) {
        return await this.blogCateRepository.deleCate(cateId);
    }
}
