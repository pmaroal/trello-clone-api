import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './board/board.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot(), //  Carga las variables de entorno desde .env
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USER || 'user',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'trello-clone',
      autoLoadEntities: true,
      synchronize: true, //  Crea/Modifica la estructura de la base de datos (NO USAR EN PRODUCCIÓN)
    }),
    BoardModule,
    TaskModule,
  ],
})
export class AppModule {}
