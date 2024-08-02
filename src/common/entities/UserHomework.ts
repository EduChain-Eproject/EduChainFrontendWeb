import { Award } from './Award';
import Homework from './Homework';
import User from './User';
import { UserAnswer } from './UserAnswer';

export class UserHomework {
  id: number;
  submissionDate: Date;
  progress: number;
  grade: number;
  isSubmitted: boolean;

  homeworkDtoId?: number;

  homeworkDto?: Homework;
  userDto?: User;
  userAnswerDtos?: UserAnswer[];

  userAwardDto?: Award;
}
