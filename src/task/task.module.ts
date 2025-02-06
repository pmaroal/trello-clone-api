import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Board } from 'src/board/entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Board])], // Registrar Task en TypeOrm

  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
