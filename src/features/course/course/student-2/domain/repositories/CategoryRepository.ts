import Category from "../entities/Category";

export interface CategoryRepository {
    getListCategories: () => Promise<{ data?: Category[]; error?: string }>;
}