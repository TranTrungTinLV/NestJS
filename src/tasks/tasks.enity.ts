import {
  Column,
  Entity,
  Index,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatus } from './tasks.model';
import { ObjectId } from 'mongodb';
// import { TaskStatus } from './task-status.enum';

@Entity()
export class Task {
  @ObjectIdColumn()
  _id: ObjectId;

  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
