import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ObjectiveType } from '../../../common/enums/index.js';
import { User } from '../../users/entities/user.entity.js';
import { RoutineDay } from './routine-day.entity.js';

@Entity('routines')
export class Routine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.rutinasRecibidas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'clienteId' })
  cliente: User;

  @Column({ name: 'clienteId' })
  clienteId: string;

  @ManyToOne(() => User, (user) => user.rutinasCreadas, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'entrenadorId' })
  entrenador: User;

  @Column({ name: 'entrenadorId' })
  entrenadorId: string;

  @Column({
    type: 'enum',
    enum: ObjectiveType,
  })
  objetivoTipo: ObjectiveType;

  @Column({ type: 'text', nullable: true })
  objetivoDescripcion: string | null;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  imcObjetivo: number | null;

  @Column({ type: 'date' })
  fechaInicio: Date;

  @Column({ type: 'date' })
  fechaFin: Date;

  @Column({ type: 'boolean', default: true })
  activa: boolean;

  @OneToMany(() => RoutineDay, (day) => day.routine, {
    cascade: true,
  })
  dias: RoutineDay[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

