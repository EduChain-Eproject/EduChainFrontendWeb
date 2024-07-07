import { CategoryRepository } from "../repositories/CategoryRepository";

export default class GetListCategories {
    constructor(private categoryRepository: CategoryRepository) { }

    async execute() {
        return await this.categoryRepository.getListCategories();
    }
}