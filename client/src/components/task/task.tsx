import { Box } from '@mui/material';
import { FC, ReactElement } from 'react';
import { Priority } from '../createTaskForm/enums/Priority';
import { Status } from '../createTaskForm/enums/Status';
import { renderPriorityBorderColor } from './helpers/renderPriorityBorderColor';
import { ITask } from './interfaces/ITask';
import TaskDescription from './_taskDescription/_taskDescription';
import TaskFooter from './_taskFooter/_taskFooter';
import TaskHeader from './_taskHeader/_taskHeader';

const Task: FC<ITask> = (props): ReactElement => {
  const {
    id,
    title = 'Test title',
    date = new Date(),
    description = 'Lorem ipsun sit emmet',
    priority = Priority.high,
    status = Status.completed,
    onStatusChange = (e) => console.log(e),
    onClick = (e) => console.log(e),
  } = props;

  return (
    <Box
      display="flex"
      width="100%"
      justifyContent="flex-start"
      flexDirection="column"
      mb={4}
      p={2}
      sx={{
        width: '100%',
        backgroundColor: 'background.paper',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: renderPriorityBorderColor(priority),
      }}
    >
      <TaskHeader title={title} date={date} />
      <TaskDescription description={description} />
      <TaskFooter
        id={id}
        status={status}
        onClick={onClick}
        onStatusChange={onStatusChange}
      />
    </Box>
  );
};

export default Task;
