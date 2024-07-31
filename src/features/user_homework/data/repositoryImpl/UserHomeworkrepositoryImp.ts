import Failure from '../../../../common/entities/Failure';
import { UserHomework } from '../../../../common/entities/UserHomework';
import { UserHomeworkRepository } from '../../domain/repository/UserHomeworkRepository';
import { UserHomeworkRequest } from '../../domain/usecase/UserHomeworkUsecase';
import { apiTakeUserHomeworks } from '../dataSource/UserHomeworkDataSource';
import { UserHomeworkDto } from '../dto/UserHomeworkDto';

export class UserHomeworkRepositoryImpl implements UserHomeworkRepository {
  async getUserHomework(listUserHomework: UserHomeworkRequest): Promise<{
    totalPages: number;
    totalElements: number;
    data?: UserHomeworkDto[];
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }> {
    try {
      const response = await apiTakeUserHomeworks(listUserHomework);
      console.log(response);
      const userHomework = response.content.map((dto: UserHomeworkDto) =>
        this.mapDtoToModel(dto),
      );
      console.log(userHomework);
      return {
        totalPages: response.totalPages,
        totalElements: response.totalElements,
        data: userHomework,
      };
    } catch (error) {
      if (error instanceof Failure) {
        return {
          totalPages: 0,
          totalElements: 0,
          error: {
            message: error.message,
            errors: error.errors,
            timestamp: error.timestamp,
          },
        };
      }
      return {
        totalPages: 0,
        totalElements: 0,
        error: {
          message: 'Unexpected error occurred on login',
          errors: { message: 'Unexpected error occurred' },
        },
      };
    }
  }

  mapDtoToModel = (dto: UserHomeworkDto): UserHomework => {
    return {
      id: dto.id,
      submissionDate: dto.submissionDate,
      progress: dto.progress,
      grade: dto.grade,
      isSubmitted: dto.isSubmitted,
    };
  };
}

export default UserHomeworkRepositoryImpl;
