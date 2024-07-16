import User from './User';
import { Homework } from './Homework';
import { Question } from './Question';
import { Answer } from './Answer';

export class UserAnswer {
  id: number;
  userDto: User | undefined;
  isCorrect: boolean;

  homeworkDto: Homework | undefined;
  questionDto: Question | undefined;
  answerDto: Answer | undefined;
}
