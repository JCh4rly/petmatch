import { Filter } from '../../../models/filter';
import { Post } from '../../../models/post';

// A common interface for CRUD operations on Posts.
export interface IPostRepository {
  get(id: string): Post;

  getAll(filter: Filter): Promise<Post[]>;
}
