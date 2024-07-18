import { BlogCateRepository } from '../repositories/BlogCateRepository';

export default class GetCates {
    constructor(private blogCateRepository: BlogCateRepository) { }


    async execute() {
        return await this.blogCateRepository.getCates();
    }
}
