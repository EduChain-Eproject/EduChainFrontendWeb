import Category from './Category';
import Chapter from './Chapter';
import CourseFeedback from './CourseFeedback';
import User from './User';
import { UserCourse } from './UserCourse';

export default class Course {
  id: number;
  price: number;
  title: string;
  description: string;
  status: string;

  teacherDto: User | undefined;
  categoryDtos: Category[] | undefined;
  chapterDtos: Chapter[] | undefined;

  numberOfEnrolledStudents: number | undefined;
  courseFeedbacks: CourseFeedback[] | undefined;
  participatedUserDtos: UserCourse[] | undefined;
  courseFeedbackDtos: CourseFeedback[] | undefined;
  relatedCourseDtos: Course[] | undefined;

  enrolled?: boolean;
}
