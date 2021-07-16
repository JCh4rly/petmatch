import Post from "../../../models/post";
import { Filter } from "../../../pages/PostsPage";
import { IPostRepository } from ".";
import { firebase } from '../../../config/firebaseConfig';

// A Post repository for Firebase.
export class FbPostRepository implements IPostRepository {
  entityRef;
  
  constructor() {
    this.entityRef = firebase.default.firestore().collection('posts');
  }

  get(id: string): Post {
    throw new Error("Method not implemented.");
  }
  
  applyFilters() {
    return this.entityRef;
  }
  
  async getAll(filter: Filter): Promise<Post[]> {
    const posts: Post[] = [];

    await this.entityRef
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
}