import { Post } from '../../../models/post';
import { IPostRepository } from '.';
import { firebase } from '../../../config/firebaseConfig';
import { Filter } from '../../../models/filter';

// A Post repository for Firebase.
// eslint-disable-next-line import/prefer-default-export
export class FbPostRepository implements IPostRepository {
  entityRef;

  constructor() {
    this.entityRef = firebase.default.firestore().collection('posts');
  }

  // eslint-disable-next-line class-methods-use-this
  get(_id: string): Post {
    throw new Error('Method not implemented.');
  }

  async getAll(_filter: Filter): Promise<Post[]> {
    const posts: Post[] = [];

    try {
      await this.filterPosts(_filter)
        .get()
        .then((query) => {
          query.forEach((doc) => {
            const post : Post = doc.data() as Post;

            post.id = doc.id;
            posts.push(post);
          });
        });
    } catch (err) {
      return err;
    }

    return posts;
  }

  filterPosts(_filter: Filter): firebase.default.firestore.Query {
    let query: firebase.default.firestore.Query;
    const getTarget = () => query || this.entityRef;

    // type.
    if (_filter.type) {
      query = getTarget().where('type', '==', _filter.type);
    }

    // pet_type.
    if (_filter.petType) {
      query = getTarget().where('pet.type', '==', _filter.petType);
    }

    // pet_sex.
    if (_filter.petSex) {
      query = getTarget().where('pet.sex', '==', _filter.petSex);
    }

    return getTarget();
  }
}
