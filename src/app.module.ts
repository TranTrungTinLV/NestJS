import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/tasks.enity';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: '127.0.0.1',
      port: 27017,
      database: 'task-management',
      entities: [Task],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
