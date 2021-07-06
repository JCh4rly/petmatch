import * as React from 'react';
import { useState } from 'react';
import { Modal, Radio, Button } from 'native-base';

const Filterbox = ({ open, onClose, onFilter, filterState }) => {
  const [filter, setFilter] = useState(filterState);

  return (
    <Modal isOpen={open} onClose={onClose} mt={12}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Filter posts</Modal.Header>
        <Modal.Body>
          <Radio.Group
            name="commonFilter"
            value={filter.option}
            onChange={(nextValue) => {
              setFilter({ ...filter, commonFilter: nextValue })
            }}
          >
            <Radio value="all" my={1}>
              All
            </Radio>
            <Radio value="my_posts" my={1}>
              My posts
            </Radio>
            <Radio value="my_fav_posts" my={1}>
              My favourite posts
            </Radio>
            <Radio value="dog" my={1}>
              Dogs
            </Radio>
            <Radio value="cat" my={1}>
              Cats
            </Radio>
          </Radio.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group variant="ghost" space={2}>
            <Button
              onPress={onFilter}
            >
              FILTER
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default Filterbox;