import { IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}

export class StatusDto {
  status: TaskStatus;
}
