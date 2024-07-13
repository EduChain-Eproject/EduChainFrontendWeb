import { UserInterestDto } from './../dto/UserInterestDto';
import { UserProfileModel } from './../../../userprofile/domain/entities/UserProfileModel';
// import { UserInterestModel } from './../../domain/entities/UserInterestModel';
import Failure from '../../../../common/entities/Failure';
import { UserInterestRepository } from '../../domain/repository/UserInterestRepository';
import {
  apiDeleteUserInterest,
  apiGetUserInterests,
} from '../dataSource/UserInterestDataSource';
import { UserInterest } from '../../domain/entities/UserInterest';
import { DeleteUserInterestRes } from '../../domain/usecase/DeleteUserInterestUseCase';

class UserInterestRepositoryImpl implements UserInterestRepository {
  async deleteUserInterests(
    deleteUserInterest: DeleteUserInterestRes,
  ): Promise<{ data?: any; error?: string }> {
    try {
      const response = await apiDeleteUserInterest(deleteUserInterest);
      return { data: response };
    } catch (error) {
      return { error: 'Failed to fetch user interests' };
    }
  }

  // deleteUserInterests(): Promise<{ data?: boolean; error?: string }> {
  //   try {
  //     const response = await apiDeleteUserInterest();
  //     return { data: response.map((dto) => this.mapDtoToEntity(dto)) };
  //   } catch (error) {
  //     return { error: 'Failed to fetch user interests' };
  //   }
  // }
  async getUserInterests(): Promise<{ data?: UserInterest[]; error?: string }> {
    try {
      const response = await apiGetUserInterests();
      return { data: response.map((dto) => this.mapDtoToEntity(dto)) };
    } catch (error) {
      return { error: 'Failed to fetch user interests' };
    }
  }

  private mapDtoToEntity(dto: UserInterestDto): UserInterest {
    const userInterest = new UserInterest();
    userInterest.course_id = dto.course_id;
    userInterest.student_id = dto.student_id;
    userInterest.description = dto.description;
    userInterest.title = dto.title;
    userInterest.price = dto.price;
    userInterest.teacherName = dto.teacherName;
    userInterest.categoryList = dto.categoryList;
    return userInterest;
  }
}

export default UserInterestRepositoryImpl;
