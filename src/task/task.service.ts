import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { Board } from 'src/board/entities/board.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async createTask(
    name: string,
    boardId: number,
    description?: string,
  ): Promise<Task> {
    const board = await this.boardRepository.findOne({
      where: { id: boardId },
    });

    if (!board) {
      throw new NotFoundException(`Board with ID ${boardId} not found`);
    }

    const newTask = this.taskRepository.create({
      name,
      description,
      board,
    });

    return this.taskRepository.save(newTask);
  }

  async getTasksByBoard(boardId: number): Promise<Task[]> {
    return this.taskRepository.find({
      where: { board: { id: boardId } },
    });
  }
}
