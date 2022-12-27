import { Router } from 'express';

import { createValidator, updateValidator } from './tasks.validator';
import { tasksController } from './tasks.controller';

export const tasksRouter = Router();

tasksRouter.get('/tasks', tasksController.getAll);
tasksRouter.post('/tasks', createValidator, tasksController.create);
tasksRouter.patch('/tasks', updateValidator, tasksController.update);
