import { Award } from './Award';
import Course from './Course';
import { UserHomework } from './UserHomework';

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
