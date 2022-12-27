import { FC, ReactElement } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TextField } from '@mui/material';

import { IDateField } from './interfaces/IDateField';

const TaskDateField: FC<IDateField> = (
  props,
): ReactElement => {
  const {
    value = new Date(),
    onChange = (date) => console.log(date),
    disabled = false,
  } = props;

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Task Date"
          inputFormat="dd/MM/yyyy"
          onChange={onChange}
          renderInput={(params) => (
            <TextField {...params} />
          )}
          value={value}
          disabled={disabled}
        />
      </LocalizationProvider>
    </>
  );
};

export default TaskDateField;
