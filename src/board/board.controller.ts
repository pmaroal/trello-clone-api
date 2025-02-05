import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';

@Controller('board') //Define que este controlador manejará las rutas que comienzan con /boards.
export class BoardController {
  constructor(private readonly boardService: BoardService) {} //Usamos el servicio BoardService que ya habíamos creado para obtener los datos de la base de datos.

  @Get()
  getAllBoards(): Promise<Board[]> {
    return this.boardService.getAllBoards(); //Usamos el método getAllBoards para servicio y obtener todos los boards de la base de datos.
  }
  @Post()
  async createBoard(@Body('title') title: string): Promise<Board> {
    return this.boardService.createBoard(title); //Usamos el método createBoard del servicio para insertar un nuevo board en la base de datos.
    //En el controlador, @Body('title') se usa para extraer el campo title del cuerpo de la solicitud POST. Es importante que el frontend envíe la propiedad title en el cuerpo de la solicitud para crear un nuevo board.
  }
}
