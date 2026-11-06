import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { FailureType } from '../../../common/enums/index.js';
import { WorkoutSession } from './workout-session.entity.js';
import { RoutineExercise } from '../../routines/entities/routine-exercise.entity.js';

@Entity('set_logs')
export class SetLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => WorkoutSession, (session) => session.setLogs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sessionId' })
  session: WorkoutSession;

  @Column({ name: 'sessionId' })
  sessionId: string;

  @ManyToOne(() => RoutineExercise, (re) => re.logs, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'routineExerciseId' })
  routineExercise: RoutineExercise;

  @Column({ name: 'routineExerciseId' })
  routineExerciseId: string;

  @Column({ type: 'int' })
  numeroSerie: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  pesoRealKg: number;

  @Column({ type: 'int', nullable: true })
  repeticionesReales: number | null;

  @Column({ type: 'int', nullable: true })
  tiempoRealSegundos: number | null;

  @Column({
    type: 'enum',
    enum: FailureType,
    default: FailureType.NINGUNO,
  })
  tipoFallo: FailureType;

  @CreateDateColumn()
  createdAt: Date;
}

