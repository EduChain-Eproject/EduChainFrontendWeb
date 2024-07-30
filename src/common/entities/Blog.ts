import { BlogCategory } from './BlogCategory';
import { BlogComment } from './BlogComment';
import { User } from './User';

export class Blog {
  id: number;
  createdAt: Date;
  title: string;
  blogText: string;
  voteUp: number;
  photo: string;
  user: User;
  blogCategory: BlogCategory;
  blogComments: BlogComment[];
}
