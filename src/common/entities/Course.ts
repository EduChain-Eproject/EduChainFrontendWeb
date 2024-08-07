import Category from './Category';
import Chapter from './Chapter';
import CourseFeedback from './CourseFeedback';
import User from './User';
import { UserCourse } from './UserCourse';
import UserInterest from './UserInterest';

export default class Course {
  id: number;
  price: number;
  title: string;
  description: string;
  status: string;
  avatarPath: string;

  teacherDto?: User;
  categoryDtos?: Category[];
  chapterDtos?: Chapter[];
  participatedUserDtos?: UserCourse[];
  courseFeedbackDtos?: CourseFeedback[];
  userInterestDtos?: UserInterest[];

  numberOfEnrolledStudents?: number;
  currentUserCourse?: UserCourse;
  relatedCourseDtos?: Course[];
}
