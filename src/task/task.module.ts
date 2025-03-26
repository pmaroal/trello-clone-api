import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { BoardModule } from 'src/board/board.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task, BoardModule])], // Registrar Task en TypeOrm

  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
