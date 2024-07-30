import Course from './Course';
import User from './User';

export default class CourseFeedback {
  id: number;
  message: string;

  courseDto?: Course;
  userDto?: User;
}
