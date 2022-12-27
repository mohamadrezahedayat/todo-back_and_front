import { body } from 'express-validator';
import { Status } from '../enums/Status';
import { Priority } from './../enums/Priority';

export const createValidator = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('Task title is required')
    .trim()
    .isString()
    .withMessage('Task title needs to be in text format'),

  body('date')
    .not()
    .isEmpty()
    .withMessage('Task date is required')
    .trim()
    .isString()
    .withMessage('Task date needs to be in valid date format'),

  body('description')
    .trim()
    .isString()
    .withMessage('Task description needs to be in text format'),

  body('priority')
    .trim()
    .isIn([Priority.high, Priority.normal, Priority.low])
    .withMessage('Task priority can only be low, normal, and high'),

  body('status')
    .trim()
    .isIn([Status.todo, Status.inProgress, Status.completed])
    .withMessage('Task Status can only be todo, inProgress, and completed'),
];

export const updateValidator = [
  body('id')
    .not()
    .isEmpty()
    .withMessage('Task ID is required')
    .trim()
    .isString()
    .withMessage('Task ID needs to be in valid uuid format'),

  body('status')
    .trim()
    .isIn([Status.todo, Status.inProgress, Status.completed])
    .withMessage('Task Status can only be todo, inProgress, and completed'),
];
