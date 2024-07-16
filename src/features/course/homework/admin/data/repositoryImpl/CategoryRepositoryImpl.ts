import Failure from '../../../../../common/entities/Failure';
import Category from '../../domain/entities/Homework';
import Course from '../../domain/entities/Lesson';
import { CategoryRepository } from '../../domain/repositories/CategoryRepository';
import { CourseRepository } from '../../domain/repositories/HomeworkRepository';
import { CreateCourseReq } from '../../domain/usecases/CreateCourse';
import { UpdateCourseReq } from '../../domain/usecases/UpdateCourse';
import { apiFetchListCategories } from '../dataSources/courseRemoteDataSource';

class CategoryRepositoryImpl implements CategoryRepository {
  async getListCategories(): Promise<{ data?: Category[]; error?: string }> {
    try {
      const response = await apiFetchListCategories();

      //TODO: mapper here
      const categories: Category[] = response.map((c) => {
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
