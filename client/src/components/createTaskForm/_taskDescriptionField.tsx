import { TextField } from '@mui/material';
import { FC, ReactElement } from 'react';

import { ITextField } from './interfaces/ITextField';

const TaskDescriptionField: FC<ITextField> = (props): ReactElement => {
  const {
    disabled = false,
    onChange = (e) => console.log(e),
    value = '',
  } = props;

  return (
    <TextField
      id="description"
      label="Description"
      placeholder="Description"
      variant="outlined"
      size="small"
      name="title"
      value={value}
      multiline
      rows={4}
      fullWidth
      disabled={disabled}
      onChange={onChange}
    />
  );
};

export default TaskDescriptionField;
