import { Status } from '../../createTaskForm/enums/Status';

export interface IUpdateTask {
  id: string;
  status: Status;
}
