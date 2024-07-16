import { Answer } from './Answer';
import { Homework } from './Homework';
import { UserAnswer } from './UserAnswer';

export class Question {
  id: number;
  questionText: string;

  homeworkDto: Homework | undefined;
  answerDtos: Answer[] | undefined;
  userAnswerDtos: UserAnswer[] | undefined;
  correctAnswerDto: Answer | undefined;
}
