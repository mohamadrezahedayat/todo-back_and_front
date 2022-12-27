import express from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Task } from './src/tasks/tasks.entity';
import { tasksRouter } from './src/tasks/tasks.router';

// instantiate express app
const app = express();
dotenv.config();

// parse request body
app.use(bodyParser.json());

// use CORS
app.use(cors());

// create DAtabase connection
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  entities: [Task],
  synchronize: true, //just be true in development
});

// define server port
const port = process.env.PORT ?? 3200;

// routes
app.use('/', tasksRouter);

AppDataSource.initialize()
  .then((value) => {
    console.log('Data source initialized');
    // console.log(value);
    app.listen(port, () =>
      console.log('listening on ' + port),
    );
  })
  .catch((err) => {
    console.log(
      'Error during data source initialization',
      err,
    );
  });
