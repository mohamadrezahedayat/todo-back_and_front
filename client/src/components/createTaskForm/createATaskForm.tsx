import {
  Alert,
  AlertTitle,
  Box,
  Button,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import { FC, ReactElement, useState, useEffect } from 'react';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { Priority } from './enums/Priority';
import { Status } from './enums/Status';
import TaskDateField from './_taskDateField';
import TaskDescriptionField from './_taskDescriptionField';
import TaskSelectField from './_taskSelectField';
import TaskTitleField from './_taskTitleField';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ICreateTask } from '../taskArea/interfaces/ICreateTask';
import { url } from '../../helpers/urls';

const CreateATaskForm: FC = (): ReactElement => {
  const [title, settitle] = useState('');
  const [description, setdescription] = useState('');
  const [date, setdate] = useState<Date | null>(new Date());
  const [status, setstatus] = useState(Status.todo);
  const [priority, setpriority] = useState(Priority.normal);

  const [showSuccess, setshowSuccess] = useState(false);

  const createTaskMutation = useMutation(sendApiRequest<ICreateTask>);
  const queyClient = useQueryClient();
  const createTaskHandler = () => {
    if (!title || !description || !date) return;
    const task: ICreateTask = {
      title,
      description,
      priority,
      status,
      date: date.toString(),
    };
    createTaskMutation.mutate(
      {
        url,
        method: 'POST',
        data: task,
      },
      {
        onSuccess: () => {
          settitle('');
          setdescription('');
          queyClient.invalidateQueries(['tasks']);
        },
      },
    );
  };

  useEffect(() => {
    if (!createTaskMutation.isSuccess) return;
    setshowSuccess(true);
    const timeout = setTimeout(() => {
      setshowSuccess(false);
    }, 7000);

    return () => {
      clearTimeout(timeout);
    };
  }, [createTaskMutation.isSuccess]);

  return (
    <Box
      display={'flex'}
      flexDirection="column"
      alignItems={'flex-start'}
      width="100%"
      px={4}
      py={6}
    >
      {showSuccess && (
        <Alert severity="success" sx={{ width: '100%', marginBottom: '16px' }}>
          <AlertTitle>Success</AlertTitle>
          The task has been created successfully
        </Alert>
      )}
      <Typography mb={2} variant="h6">
        Create A Task
      </Typography>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <TaskTitleField
          onChange={(e) => settitle(e.target.value)}
          value={title}
          disabled={createTaskMutation.isLoading}
        />
        <TaskDescriptionField
          onChange={(e) => setdescription(e.target.value)}
          value={description}
          disabled={createTaskMutation.isLoading}
        />
        <TaskDateField
          onChange={(date) => setdate(date)}
          value={date}
          disabled={createTaskMutation.isLoading}
        />

        <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
          <TaskSelectField
            label="Status"
            name="status"
            value={status}
            onChange={(e) => setstatus(e.target.value as Status)}
            disabled={createTaskMutation.isLoading}
            items={[
              {
                value: Status.todo,
                label: Status.todo.toUpperCase(),
              },
              {
                value: Status.inProgress,
                label: Status.inProgress.toUpperCase(),
              },
            ]}
          />
          <TaskSelectField
            label="Priority"
            name="priority"
            value={priority}
            onChange={(e) => setpriority(e.target.value as Priority)}
            disabled={createTaskMutation.isLoading}
            items={[
              {
                value: Priority.high,
                label: Priority.high.toUpperCase(),
              },
              {
                value: Priority.normal,
                label: Priority.normal.toUpperCase(),
              },
              {
                value: Priority.low,
                label: Priority.low.toUpperCase(),
              },
            ]}
          />
        </Stack>
        {createTaskMutation.isLoading && <LinearProgress />}

        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={createTaskHandler}
          disabled={
            !title || !description || !date || createTaskMutation.isLoading
          }
        >
          Create A Task
        </Button>
      </Stack>
    </Box>
  );
};

export default CreateATaskForm;
