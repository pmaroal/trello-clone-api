import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Board } from '../../board/entities/board.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number; // ID único de la tarea

  @Column()
  name: string; // Nombre de la tarea

  @Column({ nullable: true })
  description?: string; // Descripción opcional

  @Column({ default: false })
  completed: boolean; // Estado de la tarea

  @ManyToOne(() => Board, (board) => board.tasks, { onDelete: 'CASCADE' })
  board: Board; // Relación: Muchas tareas pertenecen a un Board
}
