import Course from './Course';
import Lesson from './Lesson';
import { Question } from './Question';
import { UserAnswer } from './UserAnswer';
import { UserHomework } from './UserHomework';
import { Award } from './Award';
import User from './User';

export class Homework {
  id: number;
  title: string;
  description: string;

  userDto: User | undefined;
  lessonDto: Lesson | undefined;
  questionDtos: Question[] | undefined;
  userAnswerDtos: UserAnswer[] | undefined;
  userHomeworkDtos: UserHomework[] | undefined;
  userAwardDtos: Award[] | undefined;
}
