import { Controller, Get } from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';

@Controller('board') //Define que este controlador manejará las rutas que comienzan con /boards.
export class BoardController {
  constructor(private readonly boardService: BoardService) {} //Usamos el servicio BoardService que ya habíamos creado para obtener los datos de la base de datos.

  @Get() // Este decorador define un método para manejar peticiones HTTP GET. En este caso, cuando se haga una petición a /boards, se llamará a getAllBoards().
  async getAllBoards(): Promise<Board[]> {
    //Este método invoca el servicio para obtener todos los boards de la base de datos.
    return this.boardService.getAllBoards();
  }
}
