import Category from './Category';
import { Certification } from './Certification';
import Chapter from './Chapter';
import CourseFeedback from './CourseFeedback';
import User from './User';
import UserCourse from './UserCourse';
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
  certifiedParticipantDtos?: Certification[];

  numberOfEnrolledStudents?: number;
  currentUserCourse?: UserCourse;
  relatedCourseDtos?: Course[];
}
