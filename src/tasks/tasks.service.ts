import { Injectable, NotFoundException } from '@nestjs/common';
// import { Task, TaskStatus } from './tasks.model';
import { InjectRepository } from '@nestjs/typeorm';
// import { TasksRepository } from './tasks.reposity';
import { Task } from './tasks.enity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks.model';
import { MongoRepository } from 'typeorm';
import { v4 } from 'uuid';
import { TaskRepository } from './tasks.reposity';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';
import { GetUsers } from 'src/auth/get-user.dectorator';
// import { TasksRepository } from './tasks.reposity';
// import { MongoRepository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}
  // private tasks: Task[] = [];

  //all
  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }


  getTaskById(id: string, user: User): Promise<Task> {
    return this.taskRepository.getTaskById(id, user);
  }


  // //delete details
  async deleteTaskById(id: string, user: User): Promise<void> {
    return this.taskRepository.deleteTask(id, user);
  }
  // //generate ID v4 uuid
  genergateId(): string {
    return v4().split('-')[0];
  }
  //creating Task
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }
  //update Task
  async updateTaskStatus(id: string, status: TaskStatus, user: User) {
    const task = await this.getTaskById(id, user);
    task.status = status;
    return task;
  }
}
