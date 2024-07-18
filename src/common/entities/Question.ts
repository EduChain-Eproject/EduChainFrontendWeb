import { Answer } from './Answer';
import Homework from './Homework';
import { UserAnswer } from './UserAnswer';

export class Question {
  id: number;
  questionText: string;

  homeworkId?: number;
  correctAnswerId?: number;

  homeworkDto?: Homework;
  answerDtos?: Answer[];
  userAnswerDtos?: UserAnswer[];
  correctAnswerDto?: Answer;

  currentUserAnswerDto?: UserAnswer;
}
