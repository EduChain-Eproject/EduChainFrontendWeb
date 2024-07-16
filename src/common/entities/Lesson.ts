import Chapter from './Chapter';
import { Homework } from './Homework';

export default class Lesson {
  id: number;

  lessonTitle: string;

  description: string;

  videoTitle: string;

  videoURL: string;

  chapterDto: Chapter;

  homeworkDtos: Homework[];
}
