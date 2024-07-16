import { Homework } from './Homework';
import User from './User';

export class UserHomework {
  id: number;
  submissionDate: Date;
  progress: number; // This can be a percentage or any metric that makes sense
  grade: number;
  isSubmitted: boolean;

  homeworkDto: Homework;
  userDto: User | undefined;
}
