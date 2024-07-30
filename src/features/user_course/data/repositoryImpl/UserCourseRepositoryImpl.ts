import { UserCourse } from '../../domain/entities/UserCourse';
import { UserCourseRepository } from '../../domain/repository/UserCourseRepository';
import { AddUserCourseReq } from '../../domain/usecase/AddUserCourseUseCase';
import { GetUserCourseRequest } from '../../domain/usecase/GetUserCourseUseCase';
import {
  apiAddUserCouse,
  apiGetUserCourse,
} from '../dataSrouce/UserCourseDataSrouce';
import { UserCourseDTO } from '../dto/UserCourseDTO';

export class UserCourseRepositoryImpl implements UserCourseRepository {
  async getUserCourse(req: GetUserCourseRequest): Promise<{
    totalPages: number;
    totalElements: number;
    data?: UserCourse[];
    error?: string;
  }> {
    try {
      const response = await apiGetUserCourse(req);
      console.log(response.content);
      const userCourse = response.content.map((dto: UserCourseDTO) =>
        this.mapDtoToEntity(dto),
      );
      return {
        totalPages: response.totalPages,
        totalElements: response.totalElements,
        data: userCourse,
      };
    } catch (error) {
      return {
        totalPages: 0,
        totalElements: 0,
        error: 'Fail to fetch usercourse',
      };
    }
  }

  async addUserCourse(
    req: AddUserCourseReq,
  ): Promise<{ data?: UserCourseDTO; error?: string }> {
    try {
      const response = await apiAddUserCouse(req);
      const userCourse = this.mapDtoToEntity(response);
      return { data: userCourse };
    } catch (error) {
      return {
        error: 'Fail to fetch usercourse',
      };
    }
  }

  private mapDtoToEntity(dto: UserCourseDTO): UserCourse {
    return {
      teacherName: dto.teacherName,
      teacherEmail: dto.teacherEmail,
      title: dto.title,
      enrollmentDate: new Date(dto.enrollmentDate), // Convert timestamp to Date object
      price: dto.price,
      completionStatus: dto.completionStatus,
      categoryList: dto.categoryList.map((category) => ({
        id: category.id,
        categoryDescription: category.categoryDescription,
        categoryName: category.categoryName,
        courseDtos: category.courseDtos,
      })), // Ensure the inner mapping is also correct
    };
  }
}
