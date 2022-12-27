import { FC, ReactElement } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { ISelectField } from './interfaces/ISelectField';

const TaskSelectField: FC<ISelectField> = (
  props,
): ReactElement => {
  const {
    value = '',
    label = 'Select Box',
    name = 'selectBox',
    items = [{ value: '', label: 'Add Items' }],
    disabled = false,
    onChange = (e) => console.log(e),
  } = props;

  return (
    <FormControl fullWidth size="small">
      <InputLabel id={`${name}-id`}>{label}</InputLabel>
      <Select
        labelId={`${name}-id`}
        id={`${name}-id-select`}
        value={value}
        label={label}
        name={name}
        onChange={onChange}
        disabled={disabled}
      >
        {items.map((item, index) => (
          <MenuItem
            value={item.value}
            key={item.value + index}
          >
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TaskSelectField;
