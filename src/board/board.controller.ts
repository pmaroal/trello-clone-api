import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';

@Controller('board') //Define que este controlador manejará las rutas que comienzan con /board.
export class BoardController {
  constructor(private readonly boardService: BoardService) {} //Usamos el servicio BoardService que ya habíamos creado para obtener los datos de la base de datos.

  @Get()
  getAllBoards(): Promise<Board[]> {
    return this.boardService.getAllBoards(); //Usamos el método getAllBoards para servicio y obtener todos los boards de la base de datos.
  }
  @Post()
  async createBoard(@Body('name') name: string): Promise<Board> {
    return this.boardService.createBoard(name); //Usamos el método createBoard del servicio para insertar un nuevo board en la base de datos.
    //En el controlador, @Body('name') se usa para extraer el campo name del cuerpo de la solicitud POST. Es importante que el frontend envíe la propiedad name en el cuerpo de la solicitud para crear un nuevo board.
  }
  @Delete(':id')
  async deleteBoard(@Param('id', ParseIntPipe) boardId: number) {
    await this.boardService.deleteBoard(boardId);
    return { message: 'Board deleted successfully' };
  }
}
