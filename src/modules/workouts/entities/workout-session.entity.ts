import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity.js';
import { RoutineDay } from '../../routines/entities/routine-day.entity.js';
import { SetLog } from './set-log.entity.js';

@Entity('workout_sessions')
export class WorkoutSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.workoutSessions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'clienteId' })
  cliente: User;

  @Column({ name: 'clienteId' })
  clienteId: string;

  @ManyToOne(() => RoutineDay, (day) => day.sesiones, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'routineDayId' })
  routineDay: RoutineDay;

  @Column({ name: 'routineDayId' })
  routineDayId: string;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'boolean', default: true })
  asistenciaConfirmada: boolean;

  @OneToMany(() => SetLog, (log) => log.session, {
    cascade: true,
  })
  setLogs: SetLog[];

  @CreateDateColumn()
  createdAt: Date;
}

