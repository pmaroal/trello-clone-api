import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Board } from './board.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number; // ID único de la tarea

  @Column()
  title: string; // Nombre de la tarea

  @Column({ nullable: true })
  description?: string; // Descripción opcional

  @Column({ default: 'todo' })
  status: string; // Estado de la tarea ("todo", "in progress", "done")

  @ManyToOne(() => Board, (board) => board.tasks, { onDelete: 'CASCADE' })
  board: Board; // La tarea pertenece a un Board
}
