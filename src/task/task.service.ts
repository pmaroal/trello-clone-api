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
  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async getTasksByBoard(boardId: number): Promise<Task[]> {
    return this.taskRepository.find({
      where: { board: { id: boardId } },
    });
  }

  async deleteTask(taskId: number): Promise<void> {
    const result = await this.taskRepository.delete(taskId);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
  }

  async updateTask(id: number, updateData: Partial<Task>): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    Object.assign(task, updateData); // Actualiza solo los campos enviados
    return this.taskRepository.save(task);
  }
}
