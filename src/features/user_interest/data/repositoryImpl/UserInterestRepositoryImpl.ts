import { UserInterestDto } from './../dto/UserInterestDto';
import { UserProfileModel } from './../../../userprofile/domain/entities/UserProfileModel';
// import { UserInterestModel } from './../../domain/entities/UserInterestModel';
import Failure from '../../../../common/types/Failure';
import { UserInterestRepository } from '../../domain/repository/UserInterestRepository';
import {
  apiDeleteUserInterest,
  apiTakeUserInterests,
} from '../dataSource/UserInterestDataSource';
import { UserInterest } from '../../domain/entities/UserInterest';
import { DeleteUserInterestRes } from '../../domain/usecase/DeleteUserInterestUseCase';
import { GetUserInterestReq } from '../../domain/usecase/GetUserInterests UserCase';

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

  async getUserInterests(
    userInterest: GetUserInterestReq,
  ): Promise<{ data?: UserInterest[]; error?: string }> {
    try {
      const response = await apiTakeUserInterests(userInterest);
      console.log(response); // This will log the full response object including 'content'
      const userInterests = response.content.map((dto: UserInterestDto) =>
        this.mapDtoToEntity(dto),
      );
      return { data: userInterests };
    } catch (error) {
      return { error: 'Failed to fetch user interests' };
    }
  }
  private mapDtoToEntity(dto: UserInterestDto): UserInterest {
    const userInterest = new UserInterest();
    console.log(dto);
    userInterest.course_id = dto.course_id;
    userInterest.student_id = dto.student_id;
    userInterest.description = dto.description;
    userInterest.title = dto.title;
    userInterest.price = dto.price;
    userInterest.teacherName = dto.teacherName;
    userInterest.categoryList = dto.categoryList;
    console.log(userInterest);
    return userInterest;
  }
}

export default UserInterestRepositoryImpl;
