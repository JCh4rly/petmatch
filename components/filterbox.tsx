/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Modal, Button, Box } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { Filter } from '../models/filter';
import Dropdown from './dropdown';
import { petTypeOptions, typeOptions } from '../models/common/options';
import { PetSex } from '../models/pet';

type FilterProps = {
  open: boolean,
  filter: Filter,
  onClose: () => void,
  onFilter: (filter: Filter) => void,
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Filterbox = ({
  open, onClose, onFilter, filter,
}: FilterProps) => {
  const { control, handleSubmit } = useForm({ defaultValues: filter });
  const onSubmit = (data: Filter) => {
    onFilter(data);
    onClose();
  };

  const petSexOptions = [{
    value: '', label: 'Any sex',
  }, {
    value: PetSex.male, label: 'Male',
  }, {
    value: PetSex.female, label: 'Female',
  }];

  return (
    <Modal isOpen={open} onClose={onClose} mt={12}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Filter posts</Modal.Header>
        <Modal.Body>
          <Box>
            {/* type */}
            <Controller
              name="type"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  options={typeOptions}
                  value={value}
                  onSelect={(selection: string) => onChange(selection)}
                />
              )}
            />

            {/* pet type */}
            <Controller
              name="petType"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  options={petTypeOptions}
                  value={value}
                  onSelect={(selection: string) => onChange(selection)}
                />
              )}
            />

            {/* pet type */}
            <Controller
              name="petSex"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  options={petSexOptions}
                  value={value}
                  onSelect={(selection: string) => onChange(selection)}
                />
              )}
            />
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group variant="ghost" space={2}>
            <Button
              onPress={handleSubmit(onSubmit)}
            >
              APPLY FILTER
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default Filterbox;
