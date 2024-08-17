import { Page } from './../../../../../common/entities/Page';
import { BlogRepository } from '../repositories/BlogRepository';

export default class GetBlogs {
  constructor(private blogRepository: BlogRepository) {}

  async execute(req: TakeBlogsReq) {
    return await this.blogRepository.getBlogs(req);
  }
}

export type TakeBlogsReq = {
  page: number;
  size: number;
  sortBy: string;
};
