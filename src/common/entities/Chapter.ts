import Course from './Course';
import Lesson from './Lesson';

export default class Chapter {
  id: number;
  chapterTitle: string;
  courseDto?: Course;
  lessonDtos?: Lesson[];
}
