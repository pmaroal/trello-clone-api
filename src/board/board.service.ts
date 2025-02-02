import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';

@Injectable() //Indica que esta clase puede ser inyectable en otros lugares
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}
  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }
}
