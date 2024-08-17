import Failure from '../../../../../common/entities/Failure';
import { BlogCategory } from '../../domain/entities/BlogCategory';
import { BlogCateRepository } from '../../domain/repositories/BlogCateRepository';
import { CreateCateReq } from '../../domain/usecases/CreateCate';
import { UpdateCateReq } from '../../domain/usecases/UpdateCate';
import { 
    apiCreateCate,
    apiDeleteCate,
    apiFetchCate,
    apiFetchCates,
    apiUpdateCate
} from '../dataSources/BlogCateRemoteDataSource';

class BlogCateRepositoryImpl implements BlogCateRepository {
  async getCates(): Promise<{
    data?: BlogCategory[];
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }> {
    try {
      const response = await apiFetchCates();
      return { data: response };
    } catch (error) {
      if (error instanceof Failure) {
        return {
          error: {
            message: error.message,
            errors: error.errors,
            timestamp: error.timestamp,
          },
        };
      }
      return {
        error: {
          message: 'Unexpected error occurred on login',
          errors: { message: 'Unexpected error occurred' },
        },
      };
    }
  }

  async getCate(cateId: number): Promise<{
    data?: BlogCategory;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }> {
    try {
      const response = await apiFetchCate(cateId);
      return { data: response };
    } catch (error) {
      if (error instanceof Failure) {
        return {
          error: {
            message: error.message,
            errors: error.errors,
            timestamp: error.timestamp,
          },
        };
      }
      return {
        error: {
          message: 'Unexpected error occurred on login',
          errors: { message: 'Unexpected error occurred' },
        },
      };
    }
  }

  async createCate(cateData: CreateCateReq): Promise<{
    data?: BlogCategory;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }> {
    try {
      const response = await apiCreateCate(cateData);
      return { data: response };
    } catch (error) {
      if (error instanceof Failure) {
        return {
          error: {
            message: error.message,
            errors: error.errors,
            timestamp: error.timestamp,
          },
        };
      }
      return {
        error: {
          message: 'Unexpected error occurred on login',
          errors: { message: 'Unexpected error occurred' },
        },
      };
    }
  }

  async updateCate(
    cateId: number,
    cateData: UpdateCateReq,
  ): Promise<{
    data?: BlogCategory;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }> {
    try {
      const response = await apiUpdateCate(cateId, cateData);
      return { data: response };
    } catch (error) {
      if (error instanceof Failure) {
        return {
          error: {
            message: error.message,
            errors: error.errors,
            timestamp: error.timestamp,
          },
        };
      }
      return {
        error: {
          message: 'Unexpected error occurred on login',
          errors: { message: 'Unexpected error occurred' },
        },
      };
    }
  }

  async deleCate(cateId: number): Promise<{ data?: void; error?: string }> {
    try {
      const response = await apiDeleteCate(cateId);
      return { data: response };
    } catch (error) {
      if (error instanceof Failure) {
        return { error: error.message };
      }
      return { error: 'Unexpected error occurred' };
    }
  }
}

export default BlogCateRepositoryImpl;