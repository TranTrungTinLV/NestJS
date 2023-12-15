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
// import { TasksRepository } from './tasks.reposity';
// import { MongoRepository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}
  // private tasks: Task[] = [];

  //all
  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }
  // //search get Task
  // getTaskwithSearch(filterDto: GetTasksFilterDto): Task[] {
  //   const { search, status } = filterDto;
  //   let tasks = this.getAllTask();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //     if (!tasks) {
  //       throw new NotFoundException(`Task with ${tasks} not found`);
  //     }
  //   } else if (search) {
  //     tasks = tasks.filter((task) => {reate
  
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   if (!status) {
  //     throw new NotFoundException(`Task with ${status} not found`);
  //   }
  //   return tasks;
  // }

  getTaskById(id: string): Promise<Task> {
    return this.taskRepository.getTaskById(id);
  }
  //details
  // getTaskById(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Task with ${id} not found`);
  //   }
  //   return found;
  // }

  // //delete details
  // deleteTaskById(id: string): void {
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  // }
  // //generate ID v4 uuid
  genergateId(): string {
    return v4().split('-')[0];
  }
  //creating Task
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }
  // //update Task
  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
