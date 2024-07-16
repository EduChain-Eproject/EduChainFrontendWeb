import Course from './Course';
import { Question } from './Question';
import { UserAnswer } from './UserAnswer';

export class Answer {
  id: number;
  answerText: string;

  questionDto: Question;
  userAnswerDtos: UserAnswer[];
}
