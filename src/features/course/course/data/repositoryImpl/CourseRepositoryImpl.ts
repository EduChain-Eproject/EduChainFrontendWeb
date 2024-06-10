import Failure from '../../../../../common/types/Failure';
import Course from '../../domain/entities/Course';
import { CourseRepository } from '../../domain/repositories/CourseRepository';
import { CreateCourseReq } from '../../domain/usecases/CreateCourse';
import { UpdateCourseReq } from '../../domain/usecases/UpdateCourse';
import { apiFetchCourses, apiFetchCourseDetail, apiCreateCourse, apiUpdateCourse, apiDeleteCourse } from '../dataSources/courseRemoteDataSource';

class CourseRepositoryImpl implements CourseRepository {
    async getCourses(): Promise<{ data?: Course[]; error?: string }> {
        try {
            const response = await apiFetchCourses();
            return { data: response };
        } catch (error) {
            if (error instanceof Failure) {
                return { error: error.message };
            }
            return { error: 'Unexpected error occurred' };
        }
    }

    async getCourseDetail(courseId: string): Promise<{ data?: Course; error?: string }> {
        try {
            const response = await apiFetchCourseDetail(courseId);
            return { data: response };
        } catch (error) {
            if (error instanceof Failure) {
                return { error: error.message };
            }
            return { error: 'Unexpected error occurred' };
        }
    }

    async createCourse(courseData: CreateCourseReq): Promise<{ data?: Course; error?: string }> {
        try {
            const response = await apiCreateCourse(courseData);
            return { data: response };
        } catch (error) {
            if (error instanceof Failure) {
                return { error: error.message };
            }
            return { error: 'Unexpected error occurred' };
        }
    }

    async updateCourse(courseId: string, courseData: UpdateCourseReq): Promise<{ data?: Course; error?: string }> {
        try {
            const response = await apiUpdateCourse(courseId, courseData);
            return { data: response };
        } catch (error) {
            if (error instanceof Failure) {
                return { error: error.message };
            }
            return { error: 'Unexpected error occurred' };
        }
    }

    async deleteCourse(courseId: string): Promise<{ data?: void; error?: string }> {
        try {
            const response = await apiDeleteCourse(courseId);
            return { data: response };
        } catch (error) {
            if (error instanceof Failure) {
                return { error: error.message };
            }
            return { error: 'Unexpected error occurred' };
        }
    }
}

export default CourseRepositoryImpl;