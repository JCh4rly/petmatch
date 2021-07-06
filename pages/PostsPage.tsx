import * as React from 'react';
import { FlatList, Box, Row, Column, Pressable, Text, Icon, IconButton, Button, Modal, Radio } from 'native-base';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import  { useState, useEffect } from 'react';
import { firebase } from '../config/firebaseConfig';
import Post from '../models/post';

const PostsPage = ({ navigation }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const entityRef = firebase.default.firestore().collection('posts');
  const onItemPressed = (item: Post) => {
    navigation.navigate('DetailsPage', { item });
  };
  const onCreate = () => {
    navigation.navigate('NewPostPage');
  };
  const getTitle = (item: Post) => {
    switch (item.type) {
      case 'adoption': return 'Adopción';
      case 'mating': return 'Cruza';
      default: return null;
    }
  };

  useEffect(() => {
    const loadItems = () => {
      entityRef.onSnapshot((query) => {
        const posts : Post[] = [];
        query.forEach((doc) => {
          const post : Post = doc.data() as Post;

          post.id = doc.id;
          posts.push(post);
        });
        setPosts(posts);
      });
    };

    loadItems();
  }, [])

  return (
    <>
      <Column py={.5}>
        <Box>
          <Button.Group
          variant="solid"
          isAttached
          space={6}
          mx={{
            base: "auto",
            md: 0,
          }}>
            <Button onPress={onCreate} mr={2}>
              Create post
            </Button>
          </Button.Group>
        </Box>
        <Box>
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <Row
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                key={item.id}>
                <Pressable 
                  onPress={() => onItemPressed(item)} 
                  flex={1} 
                  _pressed={{backgroundColor: '#ccc'}}>
                  <Text mx={2}>
                    {getTitle(item)}
                  </Text>
                </Pressable>  
                <IconButton
                  colorScheme="emerald"
                  icon={<Icon as={FontAwesome5} name="heart" size={5} />}
                />
              </Row>
            )}
            keyExtractor={(item) => item.id}        
          />
        </Box>      
      </Column>
    </>
  )
};

export default PostsPage;