import * as React from 'react';
import {
  FlatList, Box, Column, Button,
} from 'native-base';
import { StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { Post } from '../models/post';
import { RepositoryFactory } from '../services/repos/factory';
import { Filter } from '../models/filter';
import Filterbox from '../components/filterbox';
import PetCard from '../components/pet.card';

const defaultFilter: Filter = {
  type: '',
  petType: '',
  petSex: '',
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 2,
  },
});

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
      <Column py={0.5} flex={1}>
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
        <Box style={styles.listContainer}>
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <PetCard item={item} />
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
