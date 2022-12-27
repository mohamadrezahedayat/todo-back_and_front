import { ChangeEvent, MouseEvent } from 'react';
import { Status } from '../../createTaskForm/enums/Status';

export interface ITaskFooter {
  onStatusChange?: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  onClick?: (id: string) => void;
  status?: Status;
  id: string;
}
