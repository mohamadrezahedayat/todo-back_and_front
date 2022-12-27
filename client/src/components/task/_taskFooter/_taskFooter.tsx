import { Box, Button, FormControlLabel, Switch } from '@mui/material';
import { FC, ReactElement } from 'react';
import { Status } from '../../createTaskForm/enums/Status';
import { ITaskFooter } from '../interfaces/ITaskFooter';

const TaskFooter: FC<ITaskFooter> = (props): ReactElement => {
  const {
    onStatusChange = (e) => console.log(e),
    onClick = (e) => console.log(e),
    id,
    status = Status.completed,
  } = props;
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={4}
    >
      <FormControlLabel
        label="In Progress"
        control={
          <Switch
            color="warning"
            onChange={(e) => onStatusChange(e, id)}
            checked={status === Status.inProgress}
          />
        }
      />
      <Button
        variant="contained"
        color="success"
        size="small"
        sx={{ color: '#fff' }}
        onClick={() => onClick(id)}
        disabled={status === Status.completed}
      >
        Mark Complete
      </Button>
    </Box>
  );
};

export default TaskFooter;
