import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board])], //Asegura que la entidad Board esté disponible para el repositorio de Board en el servicio.
  controllers: [BoardController], // Asegura que el BoardController esté registrado en el módulo.
  providers: [BoardService],
  exports: [BoardService, TypeOrmModule],
})
export class BoardModule {}
