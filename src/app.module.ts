import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './board/board.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot(), //  Carga las variables de entorno desde .env
    TypeOrmModule.forRoot({
      type: 'postgres', //  Definimos que vamos a usar PostgreSQL
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true, //  Carga las entidades registradas
      synchronize: true, //  Crea/Modifica la estructura de la base de datos (NO USAR EN PRODUCCIÓN)
    }), BoardModule, TaskModule,
  ],
})
export class AppModule {}
