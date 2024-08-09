import { Award } from './Award';
import Course from './Course';
import UserCourse from './UserCourse';
import { UserHomework } from './UserHomework';
import UserInterest from './UserInterest';

export default class User {
  id: number;
  firstName: string;
  lastName: string;
  avatarPath: string;
  phone: string;
  address: string;
  role: Role;
  email: string;
  userAwardDtos: Award[] | undefined;
  userHomeworkDtos: UserHomework[] | undefined;
  courseDtosParticipated: UserCourse[] | undefined;
  userInterestDtos: UserInterest[] | undefined;
  isActive: boolean;
  constructor(role: Role, email: string) {
    this.role = role;
    this.email = email;
  }

  numberOfStudents?: number;
  mostPopularCourse?: Course;
}

export enum Role {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
  CENSOR = 'CENSOR',
}
