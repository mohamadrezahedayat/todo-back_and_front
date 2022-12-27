import { TextField } from '@mui/material';
import { FC, ReactElement } from 'react';
import { ITextField } from './interfaces/ITextField';

const TaskTitleField: FC<ITextField> = (props): ReactElement => {
  const {
    disabled = false,
    onChange = (e) => console.log(e),
    value = '',
  } = props;

  return (
    <TextField
      id="title"
      label="Task title"
      placeholder="Task Title"
      variant="outlined"
      size="small"
      name="title"
      value={value}
      disabled={disabled}
      onChange={onChange}
      fullWidth
    />
  );
};

export default TaskTitleField;
