import { IsEnum } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class updateStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
