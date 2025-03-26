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
  NotFoundException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { BoardService } from 'src/board/board.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService,     
    private readonly boardService: BoardService // Inyectamos BoardService
  ) {}

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


  @Patch(':taskId')
  async updateTaskBoard(
    @Param('taskId') taskId: string,
    @Body() body: { boardId: number } // Aseguramos que boardId sea de tipo number
  ): Promise<Task> {
    const task = await this.taskService.findOne(taskId);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
  
    // Buscar el board al que se quiere mover la task
    const board = await this.boardService.findOne(body.boardId);
    if (!board) {
      throw new NotFoundException('Board not found');
    }
  
    // Asignar el nuevo board a la task
    task.board = board;
  
    // Guardar la task actualizada
    return this.taskService.update(taskId, task);
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
