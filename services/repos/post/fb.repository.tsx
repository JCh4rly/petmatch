import { Post, Filter } from '../../../models/post';
import { IPostRepository } from '.';
import { firebase } from '../../../config/firebaseConfig';

// A Post repository for Firebase.
export default class FbPostRepository implements IPostRepository {
  entityRef;

  constructor() {
    this.entityRef = firebase.default.firestore().collection('posts');
  }

  // eslint-disable-next-line class-methods-use-this
  get(_id: string): Post {
    throw new Error('Method not implemented.');
  }

  applyFilters() {
    return this.entityRef;
  }

  async getAll(_filter: Filter): Promise<Post[]> {
    const posts: Post[] = [];

    await this.filterPosts()
      .get()
      .then((query) => {
        query.forEach((doc) => {
          const post : Post = doc.data() as Post;

          post.id = doc.id;
          posts.push(post);
        });
      });

    return posts;
  }

  filterPosts() {
    return this.entityRef;
  }
}
