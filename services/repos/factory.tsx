import { IPostRepository } from "./post";
import { FbPostRepository } from "./post/fb.repository";

// A simple repository factory. 
export class RepositoryFactory {
  getPostRepository() : IPostRepository {
    // Return a default repository.
    return new FbPostRepository();
  }
}