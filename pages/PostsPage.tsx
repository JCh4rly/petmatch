import * as React from 'react';
import {
  FlatList, Box, Row, Column, Pressable, Text, Icon, IconButton, Button,
} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { Post, PostTypes } from '../models/post';
import { RepositoryFactory } from '../services/repos/factory';
import { Filter } from '../models/filter';
import { PetTypes } from '../models/pet';
import Filterbox from '../components/filterbox';

const defaultFilter: Filter = {
  type: '',
  petType: '',
  petSex: '',
};

// eslint-disable-next-line react/prop-types
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const PostsPage = ({ navigation }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<Filter>(defaultFilter);
  const [filterOpen, setFilterOpen] = useState(false);
  const onItemPressed = (item: Post) => navigation.navigate('DetailsPage', { item });
  const onCreate = () => navigation.navigate('NewPostPage');
  const onFilter = () => setFilterOpen(true);
  const getTitle = (item: Post) => {
    switch (item.type) {
      case 'adoption': return 'Adopción';
      case 'mating': return 'Cruza';
      default: return null;
    }
  };

  useEffect(() => {
    const loadItems = async () => {
      const factory = new RepositoryFactory();
      const repo = factory.getPostRepository();
      const result = await repo.getAll(filter);

      setPosts(result);
    };

    loadItems();
  }, [filter]);

  return (
    <>
      <Column py={0.5}>
        <Box>
          <Button.Group
            variant="solid"
            isAttached
            space={6}
            mx={{
              base: 'auto',
              md: 0,
            }}
          >
            <Button onPress={onCreate} mr={2}>
              Create post
            </Button>
            <Button onPress={onFilter} mr={2}>
              Filter posts
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
                key={item.id}
              >
                <Pressable
                  onPress={() => onItemPressed(item)}
                  flex={1}
                  _pressed={{ backgroundColor: '#ccc' }}
                >
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
      <Filterbox
        open={filterOpen}
        filter={filter}
        onFilter={(value: Filter) => setFilter(value)}
        onClose={() => setFilterOpen(false)}
      />
    </>
  );
};

export default PostsPage;
