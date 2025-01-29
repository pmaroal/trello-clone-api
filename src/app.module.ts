import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
