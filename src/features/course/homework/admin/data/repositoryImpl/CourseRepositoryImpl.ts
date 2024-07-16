import Failure from '../../../../../common/entities/Failure';
import Category from '../../domain/entities/Homework';
import Chapter from '../../domain/entities/Question';
import Course from '../../domain/entities/Lesson';
import { CourseRepository } from '../../domain/repositories/HomeworkRepository';
import { CreateCourseReq } from '../../domain/usecases/CreateCourse';
import { GetCoursesByTeacherRequest } from '../../domain/usecases/GetCoursesByTeacher';
import { UpdateCourseReq } from '../../domain/usecases/UpdateCourse';
import {
  apiFetchCourseDetail,
  apiCreateCourse,
  apiUpdateCourse,
  apiGetCoursesByTeacher,
  apiDeactivateCourse,
} from '../dataSources/courseRemoteDataSource';
import { CourseDto } from '../models/CourseDto';

class CourseRepositoryImpl implements CourseRepository {
  async getCoursesByTeacher(
    request: GetCoursesByTeacherRequest,
  ): Promise<{ data?: Course[]; error?: string }> {
    try {
      const response = await apiGetCoursesByTeacher(request);
      const courses = response.map((dto: CourseDto) =>
        this.mapDtoToEntity(dto),
      );
      return { data: courses };
    } catch (error) {
      return { error: 'Failed to fetch courses' };
    }
  }

  async createCourse(
    courseData: CreateCourseReq,
  ): Promise<{ data?: Course; error?: string }> {
    try {
      const response = await apiCreateCourse(courseData);
      return { data: this.mapDtoToEntity(response) };
    } catch (error) {
      return { error: 'Failed to create course' };
    }
  }

  async getCourseDetail(
    courseId: number,
  ): Promise<{ data?: Course; error?: string }> {
    try {
      const response = await apiFetchCourseDetail(courseId);
      const course = this.mapDtoToEntity(response);
      return { data: course };
    } catch (error) {
      if (error instanceof Failure) {
        return { error: error.message };
      }
      return { error: 'Unexpected error occurred' };
    }
  }

  async updateCourse(
    courseId: number,
    courseData: UpdateCourseReq,
  ): Promise<{ data?: Course; error?: string }> {
    try {
      const response = await apiUpdateCourse(courseId, courseData);
      return { data: this.mapDtoToEntity(response) };
    } catch (error) {
      return { error: 'Failed to update course' };
    }
  }

  async deactivateCourse(
    courseId: number,
  ): Promise<{ data?: boolean; error?: string }> {
    try {
      await apiDeactivateCourse(courseId);
      return { data: true };
    } catch (error) {
      return { error: 'Failed to delete course' };
    }
  }

  private mapDtoToEntity(dto: CourseDto): Course {
    const course = new Course();
    course.id = dto.id;
    course.title = dto.title;
    course.description = dto.description;
    course.price = dto.price;
    course.status = dto.status;
    course.categories = dto.categoryDtos?.map((cate) => {
      const category = new Category();
      category.id = cate.id;
      category.categoryName = cate.categoryName;
      return category;
    });
    course.chapters = dto.chapterDtos?.map((ct) => {
      const chapter = new Chapter();
      chapter.id = ct.id;
      chapter.chapterTitle = ct.chapterTitle;
      return chapter;
    });
    return course;
  }
}

export default CourseRepositoryImpl;
