import User from './User';
import { Homework } from './Homework';

export enum AwardStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class Award {
  id: number;
  status: AwardStatus;
  submissionDate: Date;
  reviewDate: Date;
  comments: string;

  userDto: User | undefined;
  homeworkDto: Homework | undefined;
}
