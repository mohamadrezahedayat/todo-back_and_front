import { Grid } from '@mui/material';
import { FC, ReactElement } from 'react';
import CreateATaskForm from '../createTaskForm/createATaskForm';
import Profile from '../profile/profile';

const Sidebar: FC = (): ReactElement => {
  return (
    <Grid
      item
      md={4}
      px={4}
      sx={{
        height: '100vh',
        position: 'fixed',
        right: 0,
        top: 0,
        width: '100%',
        backgroundColor: 'background.paper',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Profile name="Mahan" />
      <CreateATaskForm />
    </Grid>
  );
};

export default Sidebar;
