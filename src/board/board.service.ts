import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';

@Injectable() //Indica que esta clase puede ser inyectable en otros lugares
export class BoardService {
  constructor(
    @InjectRepository(Board) // Inyectamos el repositorio de Board en el servicio para poder usarlo
    private readonly boardRepository: Repository<Board>,
  ) {}

  // Función para obtener todos los boards de la base de datos
  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  // Función para insertar un nuevo board
  async createBoard(name: string): Promise<Board> {
    const newBoard = this.boardRepository.create({ name }); // Usamos el create para crear una nueva instancia
    return this.boardRepository.save(newBoard); // Guardamos el board en la base de datos
  }
}
