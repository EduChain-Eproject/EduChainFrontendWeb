import Homework from './Homework';
import User from './User';

export enum AwardStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  RECEIVED = 'RECEIVED',
}

export class Award {
  id: number;
  status: AwardStatus;
  submissionDate: Date;
  reviewDate: Date;
  comments: string;
  transactionHash: string;
  tokenAmount: string;

  homeworkDtoId?: number;

  userDto?: User;
  homeworkDto?: Homework;
}
