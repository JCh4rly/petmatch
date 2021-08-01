import { Pet } from './pet';

export type Post = {
  id: string,
  type: PostTypes,
  pet: Pet,
  description: string,
  likes: number,
}

export enum PostTypes {
  mating = 'mating',
  adoption = 'adoption',
}
