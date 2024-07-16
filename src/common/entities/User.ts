import { Award } from './Award';
import { UserHomework } from './UserHomework';

export default class User {
  id: number;
  userAwardDtos: Award[] | undefined;
  userHomeworkDtos: UserHomework[] | undefined;
  email: string;
  role: string;
  constructor(role: string, email: string) {
    this.role = role;
    this.email = email;
  }
}
