import * as React from 'react';
import { Select, CheckIcon } from 'native-base';

export type DropdownOption = {
  value: string,
  label: string
};

export type DropdownProps = {
  options: DropdownOption[],
  value: string,
  onSelect: any
};

const Dropdown = ({ options, value, onSelect }: DropdownProps) => (
  <Select
    selectedValue={value}
    minWidth={200}
    accessibilityLabel="Select a type"
    placeholder="Select a type"
    onValueChange={onSelect}
    _selectedItem={{
      bg: "teal.600",
      endIcon: <CheckIcon size={5} />,
    }}
    mt={1}
  >
    { options.map((option: DropdownOption) => <Select.Item value={option.value} label={option.label} />) }
  </Select>
);

export default Dropdown;