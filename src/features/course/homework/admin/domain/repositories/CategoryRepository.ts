import Category from "../entities/Homework";

export interface CategoryRepository {
    getListCategories: () => Promise<{ data?: Category[]; error?: string }>;
}