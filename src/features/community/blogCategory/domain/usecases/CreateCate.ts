import { BlogCateRepository } from "../repositories/BlogCateRepository";

export default class CreateCate {
    constructor(private blogCateRepository: BlogCateRepository) { }

    async execute(cateData: CreateCateReq) {
        
        return await this.blogCateRepository.createCate(cateData);
    }
}

export type CreateCateReq = {
    categoryName: string
}