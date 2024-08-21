import Course from './Course';
import User from './User';

export default class UserInterest {
  id: number;
  userDto: User | undefined;
  courseDto: Course | undefined;
}
