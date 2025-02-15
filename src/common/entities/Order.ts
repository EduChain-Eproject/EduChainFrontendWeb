import Course from './Course';
import User from './User';

export class Order {
  id: number;
  createdAt: Date;
  user: User;
  course: Course;
  amount: number;
}
