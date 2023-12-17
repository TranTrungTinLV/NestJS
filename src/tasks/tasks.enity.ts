import {
  Column,
  Entity,
  Index,
  ManyToOne,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatus } from './tasks.model';
import { ObjectId } from 'mongodb';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';
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

  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  @Exclude({
    toPlainOnly: true,
  })
  user: User;
}
