import { PetTypes } from '../pet';
import { PostTypes } from '../post';

export const typeOptions = [{
  value: '', label: 'All posts',
}, {
  value: PostTypes.adoption, label: 'Adoption',
}, {
  value: PostTypes.mating, label: 'Mating',
}];

export const petTypeOptions = [{
  value: '', label: 'All pets',
}, {
  value: PetTypes.cat, label: 'Cat',
}, {
  value: PetTypes.dog, label: 'Dog',
}];
