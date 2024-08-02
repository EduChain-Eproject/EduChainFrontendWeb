import Course from './Course';
import User from './User';

export enum CompletionStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export default class UserCourse {
  id: number;
  userDto: User | undefined;
  courseDto: Course | undefined;
  enrollmentDate: Date;
  completionStatus: CompletionStatus;
  progress: number;
}
