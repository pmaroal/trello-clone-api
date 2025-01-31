import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number; // ID único del Board

  @Column()
  title: string; // Título de la tabla (Board)

  @OneToMany(() => Task, (task) => task.board)
  tasks: Task[]; // Relación: Un Board tiene muchas Tasks
}
