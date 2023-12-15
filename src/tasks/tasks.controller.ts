import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
// import { Task } from './tasks.model';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { updateStatusDto } from './dto/update-status-dto';
import { Task } from './tasks.enity';

@Controller('tasks')
export class TasksController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(private tasksService: TasksService) {}
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    //thêm điều kiện cho get all tasks và searching only task(taskService.getTaskFilter)
    return this.tasksService.getTasks(filterDto);
  }
  @Get(':id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }
  // @Get(':id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskById(id);
  // }
  // @Delete(':id')
  // deleteTaskById(@Param('id') id: string): void {
  //   this.tasksService.deleteTaskById(id);
  // }
  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.tasksService.createTask(createTaskDto);
  // }
  // @Patch(':id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() updateStatusDto: updateStatusDto,
  // ): Task {
  //   const { status } = updateStatusDto;
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
}
