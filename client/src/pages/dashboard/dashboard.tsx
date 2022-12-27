import React, { FC, ReactElement } from 'react';
import { Grid } from '@mui/material';

import Sidebar from '../../components/sidebar/sidebar';
import TaskArea from '../../components/taskArea/taskArea';

const Dashboard: FC = (): ReactElement => {
  return (
    <Grid container minHeight="100vh" p={0} m={0}>
      <TaskArea />
      <Sidebar />
    </Grid>
  );
};

export default Dashboard;
