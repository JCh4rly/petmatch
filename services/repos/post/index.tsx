import { Post, Filter } from "../../../models/post";

// A common interface for CRUD operations on Posts.
export interface IPostRepository {
  get(id: string): Post;
  
  getAll(filter: Filter): Promise<Post[]>;
}
