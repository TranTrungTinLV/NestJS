import { EntityRepository, Repository } from 'typeorm';
import { Task } from '../tasks/tasks.enity';
import { CreateTaskDto } from './dto/create-task.dto';

import { v4 } from 'uuid';
import { TaskStatus } from './tasks.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}
  //create
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.taskRepository.create({
      id: v4().split('-')[0],
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.taskRepository.save(task);
    return task;
  }
  //get all tasks
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;

    const query: any = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { title: { $regex: new RegExp(search, 'i') } },
        { description: { $regex: new RegExp(search, 'i') } },
      ];
    }

    const tasks = await this.taskRepository.find(query);
    return tasks;
  }
  //get detail id
  async getTaskById(id: string) {
    const found = await this.taskRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
    return found;
  }
}
