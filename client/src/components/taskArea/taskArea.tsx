import { ChangeEvent } from 'react';
import { Alert, AlertTitle, Box, Grid, LinearProgress } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { Status } from '../createTaskForm/enums/Status';
import Task from '../task/task';
import TaskCounter from '../taskCounter/taskCounter';
import { ITaskApi } from './interfaces/ITaskApi';
import { IUpdateTask } from './interfaces/IUpdateTask';
import { url } from '../../helpers/urls';

const TaskArea = () => {
  const {
    data: tasks = [],
    error,
    isLoading,
    refetch,
  } = useQuery(['tasks'], () =>
    sendApiRequest<ITaskApi[]>({
      url,
      method: 'GET',
    }),
  );
  const queryClient = useQueryClient();
  const updateTaskMutation = useMutation(sendApiRequest<IUpdateTask>);
  const finishTaskMutation = useMutation(sendApiRequest<IUpdateTask>);
  const updateStatusHandler = (
    e: ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    updateTaskMutation.mutate(
      {
        url,
        method: 'PATCH',
        data: {
          id,
          status: e.target.checked ? Status.inProgress : Status.todo,
        },
      },
      { onSuccess: () => queryClient.invalidateQueries(['tasks']) },
    );
  };
  const finishTaskHandler = (id: string) => {
    finishTaskMutation.mutate(
      {
        url,
        method: 'PATCH',
        data: {
          id,
          status: Status.completed,
        },
      },
      { onSuccess: () => queryClient.invalidateQueries(['tasks']) },
    );
  };
  return (
    <Grid item md={8} px={4} sx={{}}>
      <Box mb={8} px={4}>
        <h2>Status of Your Tasks As On {format(new Date(), 'PPPP')}</h2>
      </Box>
      <Grid container display="flex" justifyContent="center">
        <Grid
          item
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          md={10}
          xs={12}
          mb={8}
        >
          <TaskCounter
            count={tasks.filter((task) => task.status === 'todo').length}
            status={Status.todo}
          />
          <TaskCounter
            count={tasks.filter((task) => task.status === 'inProgress').length}
            status={Status.inProgress}
          />
          <TaskCounter
            count={tasks.filter((task) => task.status === 'completed').length}
            status={Status.completed}
          />
        </Grid>
        <Grid item display="flex" flexDirection="column" xs={10} md={8}>
          {!!error && (
            <Alert
              severity="error"
              sx={{ width: '100%', marginBottom: '16px' }}
            >
              <AlertTitle>Error</AlertTitle>
              There was an error fetching your tasks
            </Alert>
          )}
          {!error &&
            !isLoading &&
            Array.isArray(tasks) &&
            tasks.length === 0 && (
              <Alert
                severity="warning"
                sx={{ width: '100%', marginBottom: '16px' }}
              >
                <AlertTitle>Warning</AlertTitle>
                You do not have any tasks created yet. Start by creating some
                tasks
              </Alert>
            )}
          {isLoading && <LinearProgress />}
          {Array.isArray(tasks) &&
            tasks
              .filter((task) => task.status !== Status.completed)
              .map((task) => (
                <Task
                  id={task.id}
                  key={task.id}
                  title={task.title}
                  date={new Date(task.date)}
                  description={task.description}
                  status={task.status}
                  priority={task.priority}
                  onStatusChange={updateStatusHandler}
                  onClick={finishTaskHandler}
                />
              ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TaskArea;
