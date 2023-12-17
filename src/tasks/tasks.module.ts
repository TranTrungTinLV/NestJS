import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { TasksRepository } from './tasks.reposity';
import { Task } from './tasks.enity';
import { TaskRepository } from './tasks.reposity';
import { AuthModule } from 'src/auth/auth.module';
// import { TaskRepository } from './tasks.reposity';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService, TaskRepository],
})
export class TasksModule {}
