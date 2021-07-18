import Pet from './pet';

export type Post = {
  id: string,
  type: string,
  pet: Pet,
  description: string,
}

export type Filter = {
  type: string,
  pet: {
    type: string,
    sex: string,
    breed: string,
    age: number,
  },
}
