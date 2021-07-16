import Post from "../../../models/post";
import { Filter } from "../../../pages/PostsPage";

// A common interface for CRUD operations on Posts.
export interface IPostRepository {
  get(id: string): Post;
  
  getAll(filter: Filter): Promise<Post[]>;
}
