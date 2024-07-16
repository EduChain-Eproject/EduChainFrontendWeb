import axiosService from '../../../../../common/services/axiosService';
import Failure from '../../../../../common/entities/Failure';
import Course from '../../domain/entities/Lesson';
import { CreateCourseReq } from '../../domain/usecases/CreateCourse';
import { GetCoursesByTeacherRequest } from '../../domain/usecases/GetCoursesByTeacher';
import { UpdateCourseReq } from '../../domain/usecases/UpdateCourse';
import { CategoryDto } from '../models/CategoryDto';
import { CourseDto } from '../models/CourseDto';

export const apiFetchListCategories: () => Promise<
  CategoryDto[]
> = async () => {
  try {
    const response = await axiosService.get('/COMMON/api/category/list');

    return response.data;
  } catch (error) {
    throw new Failure(error.response.data.message, error.response.status);
  }
};

export const apiFetchCourseDetail: (
  courseId: number,
) => Promise<CourseDto> = async (courseId: number) => {
  try {
    const response = await axiosService.get(`/TEACHER/api/course/${courseId}`);
    return response.data;
  } catch (error) {
    throw new Failure(error.response.data.message, error.response.status);
  }
};

export const apiGetCoursesByTeacher = async (
  request: GetCoursesByTeacherRequest,
): Promise<CourseDto[]> => {
  try {
    const response = await axiosService.post(
      `/TEACHER/api/course/list`,
      request,
    );

    return response.data.content;
  } catch (error) {
    throw new Failure(error.response.data.message, error.response.status);
  }
};

export const apiCreateCourse = async (
  courseData: CreateCourseReq,
): Promise<CourseDto> => {
  try {
    const response = await axiosService.post(
      '/TEACHER/api/course/create',
      courseData,
    );
    return response.data;
  } catch (error) {
    throw new Failure(error.response.data.message, error.response.status);
  }
};

export const apiUpdateCourse = async (
  courseId: number,
  courseData: UpdateCourseReq,
): Promise<CourseDto> => {
  try {
    const response = await axiosService.put(
      `/TEACHER/api/course/update/${courseId}`,
      courseData,
    );
    return response.data;
  } catch (error) {
    throw new Failure(error.response.data.message, error.response.status);
  }
};

export const apiDeactivateCourse = async (courseId: number): Promise<void> => {
  try {
    await axiosService.delete(`/TEACHER/api/course/deactivate/${courseId}`);
  } catch (error) {
    throw new Failure(error.response.data.message, error.response.status);
  }
};
