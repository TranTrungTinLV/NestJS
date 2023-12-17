import { ObjectId } from 'mongodb';
import { Task } from 'src/tasks/tasks.enity';
import {
  Column,
  Entity,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectId;
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;

  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
