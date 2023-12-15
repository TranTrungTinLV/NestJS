import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  //all
  getAllTask(): Task[] {
    return this.tasks;
  }
  //search get Task
  getTaskwithSearch(filterDto: GetTasksFilterDto): Task[] {
    const { search, status } = filterDto;
    let tasks = this.getAllTask();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
      if (!tasks) {
        throw new NotFoundException(`Task with ${tasks} not found`);
      }
    } else if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    if (!status) {
      throw new NotFoundException(`Task with ${status} not found`);
    }
    return tasks;
  }
  //details
  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
    return found;
  }

  //delete details
  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
  //generate ID v4 uuid
  genergateId(): string {
    return v4().split('-')[0];
  }
  //creating Task
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: this.genergateId(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
  //update Task
  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
