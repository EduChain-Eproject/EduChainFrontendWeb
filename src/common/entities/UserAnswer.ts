import User from './User';
import { Question } from './Question';
import { Answer } from './Answer';
import { UserHomework } from './UserHomework';

export class UserAnswer {
  id: number;
  isCorrect: boolean;

  userHomeworkId?: number;
  questionId?: number;
  answerId?: number;

  userDto?: User;
  userHomeworkDto?: UserHomework;
  questionDto?: Question;
  answerDto?: Answer;
}
