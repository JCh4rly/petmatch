import * as React from 'react';
import {
  Text, Box, Image, Icon, Row, Button, IconButton, Spacer,
} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { firebase } from '../config/firebaseConfig';
import { Post } from '../models/post';

type Props = {
  item: Post,
}

const PetCard = ({ item }: Props) => {
  const { type, description, likes } = item;
  const [url, setUrl] = React.useState('');
  const imgRef = firebase.default.storage().ref(item.pet.childPath);

  imgRef
    .getDownloadURL()
    .then((response) => setUrl(response))
    .catch((err) => console.log(err));

  return (
    <Box
      bg="white"
      p={3}
      mx={2}
      my={1}
      shadow={2}
      rounded="md"
    >
      { /* Post image */ }
      {url !== '' && (
        <Image
          source={{ uri: url }}
          alt="image base"
          resizeMode="cover"
          height={150}
        />
      )}

      { /* Post header */ }
      <Row mt={3} alignItems="center">
        <Icon as={<FontAwesome5 name="heart" />} size="sm" />
        <Text
          ml={1}
          fontSize="lg"
          color="warmGray.600"
        >
          { type }
        </Text>
        <Spacer />
        <Icon as={<FontAwesome5 name="thumbs-up" />} color="blue.400" size="xs" />
        <Text fontSize="xs" ml={1}>{ likes || 0 }</Text>
      </Row>

      { /* Description */ }
      <Box
        rounded="md"
        mt={2}
        p={2}
        bgColor="warmGray.100"
      >
        <Text>
          { description }
        </Text>
      </Box>

      { /* Buttons */ }
      <Row>
        <Spacer />
        <IconButton
          icon={<Icon as={<FontAwesome5 name="thumbs-up" />} size="sm" />}
          mr={2}
        />
        <IconButton
          icon={<Icon as={<FontAwesome5 name="star" />} size="sm" />}
        />
      </Row>
    </Box>
  );
};

export default PetCard;
