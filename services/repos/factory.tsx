import { IPostRepository } from './post';
import { FbPostRepository } from './post/fb.repository';

// A simple repository factory.
// eslint-disable-next-line import/prefer-default-export
export class RepositoryFactory {
  postRepo: IPostRepository;

  constructor() {
    this.postRepo = new FbPostRepository();
  }

  getPostRepository() : IPostRepository {
    // Return a default repository.
    return this.postRepo;
  }
}
