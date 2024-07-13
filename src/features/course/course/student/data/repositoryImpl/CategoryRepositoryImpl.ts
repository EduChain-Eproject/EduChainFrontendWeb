import Failure from '../../../../../../common/types/Failure';
import Category from '../../domain/entities/Category';
import { CategoryRepository } from '../../domain/repositories/CategoryRepository';
import { apiFetchListCategories } from '../dataSources/categoryRemoteDataSource';

class CategoryRepositoryImpl implements CategoryRepository {

    async getListCategories(): Promise<{ data?: Category[]; error?: string }> {
        try {
            const response = await apiFetchListCategories();

            //TODO: mapper here
            const categories: Category[] = response.map(c => {
                const cate = new Category();
                cate.categoryName = c.categoryName;
                cate.id = c.id;
                return cate;
            });

            return { data: categories };
        } catch (error) {
            if (error instanceof Failure) {
                return { error: error.message };
            }
            return { error: 'Unexpected error occurred' };
        }
    }
}

export default CategoryRepositoryImpl;