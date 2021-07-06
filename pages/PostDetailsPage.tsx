import * as React from 'react';
import { Text, Box, Image, Stack, Heading } from 'native-base';
import { firebase } from '../config/firebaseConfig';
import { useState } from 'react';

  const PostsDetailsPage = ({ route }) => {
  const [url, setUrl] = useState('');
  const { item } = route.params;
  const imgRef = firebase.default.storage().ref(item.pet.childPath);
  
  imgRef
    .getDownloadURL()
    .then((url) => setUrl(url))
    .catch((err) => console.log(err));

  return (
    <>
      <Box
        bg="white"
        shadow={2}
        rounded="lg"
        mt={5}
        mx={5}
        maxWidth="90%">
        {
          url && <Image 
          source={{uri: url}} 
          alt="image base" 
          resizeMode="cover" 
          height={150} 
          roundedTop="md" />
        }
        <Stack space={4} p={[4, 4, 8]}>
          <Text color="gray.400">June 22, 2021</Text>
          <Heading size={["md", "lg", "md"]} noOfLines={2}>
            {item.pet.name}
          </Heading>
          <Text bold color="gray.700">
            Pet: {item.pet.type}
          </Text>
          <Text color="gray.700">
            Breed: {item.pet.race}
          </Text>
          <Text color="gray.700">
            Sex: {item.pet.sex}
          </Text>
          <Text lineHeight={[5, 5, 7]} color="gray.700">
            Age: {item.pet.age}
          </Text>
          <Text lineHeight={[5, 5, 7]} color="gray.700">
            {item.description}
          </Text>
        </Stack>
      </Box>
    </>
  );
};

export default PostsDetailsPage;