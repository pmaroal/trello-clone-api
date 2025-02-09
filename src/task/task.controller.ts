import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  BadRequestException,
  Param,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(
    @Body('name') name: string,
    @Body('boardId') boardId: number,
    @Body('description') description?: string,
  ): Promise<Task> {
    return this.taskService.createTask(name, boardId, description);
  }

  @Get('board/:boardId')
  async getTasksByBoard(@Param('boardId') boardId: number) {
    if (!boardId) {
      throw new BadRequestException('boardId is required');
    }
    return this.taskService.getTasksByBoard(boardId);
  }
}
