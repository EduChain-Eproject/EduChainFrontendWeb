import Course from './Course';

export default class Category {
  id: number;
  categoryName: string;
  categoryDescription: string;

  courseDtos?: Course[];
}
