import { validationResult } from 'express-validator/src/validation-result';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Response, Request } from 'express';

import { AppDataSource } from './../../index';
import { Task } from './tasks.entity';
import { UpdateResult } from 'typeorm';

class TasksController {
  public async getAll(req: Request, res: Response) {
    let allTasks: Task[];
    try {
      allTasks = await AppDataSource.getRepository(Task).find({
        order: { date: 'ASC' },
      });
      allTasks = instanceToPlain(allTasks) as Task[];
      return res.json(allTasks).status(200);
    } catch (_errors) {
      return res.json({ error: 'Internal Server Error' }).status(500);
    }
  }

  public async create(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, date, description, priority, status } = req.body;
    const newTask = {
      ...new Task(),
      title,
      date,
      description,
      priority,
      status,
    };

    let createTask: Task;
    try {
      createTask = await AppDataSource.getRepository(Task).save(newTask);
      createTask = instanceToPlain(createTask) as Task;
      return res.json(createTask).status(201);
    } catch (_error) {
      return res.json({ error: 'Internal Server Error' }).status(500);
    }
  }

  public async update(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // try to find if task exists
    let task: Task | null;
    try {
      task = await AppDataSource.getRepository(Task).findOne({
        where: { id: req.body.id },
      });
    } catch (error) {
      return res.json({ error: 'Internal Server Error' }).status(500);
    }

    // return 400 if task is null
    if (!task) {
      return res
        .status(404)
        .json({ error: 'The task with given ID does not exist' });
    }

    // declare a variable for updated task
    let updatedTask: UpdateResult;

    // update the task
    try {
      updatedTask = await AppDataSource.getRepository(Task).update(
        req.body.id,
        plainToInstance(Task, { status: req.body.status }),
      );

      // convert the updatedTask instance to an object
      updatedTask = instanceToPlain(updatedTask) as UpdateResult;
      return res.json(updatedTask).status(200);
    } catch (error) {
      return res.json({ error: 'Internal Server Error' }).status(500);
    }
  }
}

export const tasksController = new TasksController();
