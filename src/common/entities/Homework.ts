import Lesson from './Lesson';
import { Question } from './Question';
import { UserHomework } from './UserHomework';
import { Award } from './Award';
import User from './User';

export default class Homework {
  id: number;
  title: string;
  description: string;

  userId?: number;
  lessonID?: number;

  userDto?: User;
  lessonDto?: Lesson;
  questionDtos?: Question[];
  userHomeworkDtos?: UserHomework[];
  userAwardDtos?: Award[];
}
