export type Pet = {
  type: PetTypes,
  name: string,
  race: string,
  sex: string,
  age: number,
  picture: string,
  childPath: string,
}

export enum PetTypes {
  cat = 'cat',
  dog = 'dog'
}

export enum PetSex {
  male = 'male',
  female = 'female'
}
