import { UserHomeworkDto } from '../../data/dto/UserHomeworkDto';
import { UserHomeworkRequest } from '../usecase/UserHomeworkUsecase';

export interface UserHomeworkRepository {
  getUserHomework(listUserHomework: UserHomeworkRequest): Promise<{
    totalPages: number;
    totalElements: number;
    data?: UserHomeworkDto[];
    error?: string;
  }>;
}
