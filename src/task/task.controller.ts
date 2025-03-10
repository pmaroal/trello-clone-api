import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  BadRequestException,
  Param,
  Delete,
  ParseIntPipe,
  Patch,
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

  @Get('all')
  async getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Get('board/:boardId')
  async getTasksByBoard(@Param('boardId') boardId: number) {
    if (!boardId) {
      throw new BadRequestException('boardId is required');
    }
    return this.taskService.getTasksByBoard(boardId);
  }

  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    await this.taskService.deleteTask(id);
    return { message: 'Task deleted successfully' };
  }

  @Patch(':id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<Task>,
  ) {
    return this.taskService.updateTask(id, updateData);
  }
}
