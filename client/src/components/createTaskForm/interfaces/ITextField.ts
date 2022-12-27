import { ChangeEvent } from 'react';
import { IDisabled } from './IDisabled';

export interface ITextField extends IDisabled {
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  value?: string;
}
