import { Box, Typography } from '@mui/material';
import { FC, ReactElement } from 'react';
import { ITaskDescription } from '../interfaces/ITaskDescription';

const TaskDescription: FC<ITaskDescription> = (props): ReactElement => {
  const { description = 'lorem ipsum emmet' } = props;
  return (
    <Box display="flex" width="100%" justifyContent="space-between" mb={4}>
      <Typography>{description}</Typography>
    </Box>
  );
};

export default TaskDescription;
