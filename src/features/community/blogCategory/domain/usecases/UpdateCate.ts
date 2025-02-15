import { BlogCateRepository } from '../repositories/BlogCateRepository';

export default class UpdateCate {
    constructor(private blogCateRepository: BlogCateRepository) { }


    async execute(cateId: number, cateData: UpdateCateReq) {
        return await this.blogCateRepository.updateCate(cateId, cateData);
    }
}

export type UpdateCateReq = {
    categoryName: string;
}