import * as React from 'react';
import { FormControl, Box, Column, Button, Input, useToast, Image, ScrollView } from 'native-base';
import Dropdown from '../components/dropdown';
import { useState } from 'react';
import Post from '../models/post';
import { firebase } from '../config/firebaseConfig';
import * as ImagePicker from 'expo-image-picker';

const NewPostPage = ({ navigation }) => {
  const initialData : Post = {
    type: 'mating',
    description: '',
    pet: {
      type: 'dog',
      name: '',
      race: '',
      sex: 'm',
      age: 0,
      picture: '',
      childPath: '',
    },
    id: '',
  };
  const [formData, setFormData] = useState<Post>(initialData);
  const entityRef = firebase.default.firestore().collection('posts');
  const onSelect = (name: string) => (value: string) => { setFormData({...formData, [name]: value}) };
  const onSelectPet = (name: string) => (value: string) => { setFormData({...formData, pet: {...formData.pet, [name]: value}}) };
  const onPickImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      aspect: [4, 3],
      quality: .5,
    });

    if (!result.cancelled) {
      const childPath = `pics/${Math.random().toString(36)}`;
      setFormData({ ...formData, pet: { ...formData.pet, picture: result.uri, childPath } });
    }
  }

  const typeOptions = [{
    value: 'mating', label: 'Cruza'
  }, {
    value: 'adoption', label: 'Adopción'
  }];
  const petOptions = [{
    value: 'dog', label: 'Perro',
  }, {
    value: 'cat', label: 'Gato',
  }];
  const sexOptions = [{
    value: 'm', label: 'Macho',
  }, {
    value: 'f', label: 'Hembra',
  }];
  const races = {
    dog: [{
      value: 'dogoArgentino', label: 'Dogo Argentino',
    }, {
      value: 'doberman', label: 'Doberman',
    }, {
      value: 'toy', label: 'Caniche Toy',
    },],
    cat: [{
      value: 'siames', label: 'Siamés',
    },]
  };
  const raceOptions = races[formData.pet.type];
  const toast = useToast();
  const onSubmit = async () => {
    await uploadPicture();
    await uploadData();
    toast.show({ title: 'Data saved successfuly!' });
    navigation.navigate('PostsPage');
  }
  const uploadData = async () => {
    entityRef.add(formData)
      .then(async(_doc) => {        
      })
      .catch((error) => {
        alert('An error ocurred: ' + error);
      });
  };
  const uploadPicture = async () => {
    if (!formData.pet.picture) {
      return;
    }
    
    const { picture, childPath } = formData.pet;
    const response = await fetch(picture);
    const blob = await response.blob();
    const task = firebase.default
      .storage()
      .ref()
      .child(childPath)
      .put(blob);
    const taskProgress = (snapshot) => {};
    const taskError = (snapshot) => { console.log(snapshot) };
    const taskCompleted = () => {}; 

    task.on('state_changed', taskProgress, taskError, taskCompleted);
  }
  const onCancel = () => {}

  return (
    <Column>
      <Box>
        <Button.Group
          variant="solid"
          isAttached
          space={6}
          mx={{
            base: "auto",
            md: 0,
          }}>
            <Button onPress={onSubmit} mr={2}>
              Send data
            </Button>
            <Button onPress={onCancel} mr={2}>
              Cancel
            </Button>
        </Button.Group>
      </Box>
      <ScrollView
        px={5}
        mb={60}
      >
        <FormControl>
          <FormControl.Label>Post type</FormControl.Label>
          <Dropdown value={formData.type} options={typeOptions} onSelect={onSelect('type')} />
          
          <FormControl.Label>Pet</FormControl.Label>
          <Dropdown value={formData.pet.type} options={petOptions} onSelect={onSelectPet('type')} />
          
          <FormControl.Label>Name</FormControl.Label>
          <Input placeholder="Your pet's name" />
          
          <FormControl.Label>Sex</FormControl.Label>
          <Dropdown value={formData.pet.sex} options={sexOptions} onSelect={onSelectPet('sex')} />
          
          <FormControl.Label>Race</FormControl.Label>
          <Dropdown value={formData.pet.race} options={raceOptions} onSelect={onSelectPet('race')} />

          <FormControl.Label>Picture</FormControl.Label>
          { 
            !!formData.pet.picture &&
            <Image alt="pic" style={{width: 305, height: 159}} source={{ uri: formData.pet.picture }} />
          }
          <Button onPress={onPickImage}>Select a picture</Button>
        </FormControl>
      </ScrollView>
    </Column>
  );
}

export default NewPostPage;