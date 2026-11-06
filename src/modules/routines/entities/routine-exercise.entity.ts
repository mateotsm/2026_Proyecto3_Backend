import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Intensity } from '../../../common/enums/index.js';
import { RoutineDay } from './routine-day.entity.js';
import { Exercise } from '../../exercises/entities/exercise.entity.js';
import { SetLog } from '../../workouts/entities/set-log.entity.js';

@Entity('routine_exercises')
export class RoutineExercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => RoutineDay, (day) => day.ejercicios, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'routineDayId' })
  routineDay: RoutineDay;

  @Column({ name: 'routineDayId' })
  routineDayId: string;

  @ManyToOne(() => Exercise, (exercise) => exercise.routineExercises, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'exerciseId' })
  exercise: Exercise;

  @Column({ name: 'exerciseId' })
  exerciseId: string;

  @Column({ type: 'int', default: 1 })
  orden: number;

  @Column({ type: 'int' })
  series: number;

  @Column({ type: 'int', nullable: true })
  repeticiones: number | null;

  @Column({ type: 'int', nullable: true })
  tiempoSegundos: number | null;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  pesoSugeridoKg: number | null;

  @Column({
    type: 'enum',
    enum: Intensity,
    nullable: true,
  })
  intensidad: Intensity | null;

  @Column({ type: 'int', default: 60 })
  descansoSegundos: number;

  @Column({ type: 'boolean', default: false })
  esDestacado: boolean;

  @OneToMany(() => SetLog, (log) => log.routineExercise)
  logs: SetLog[];
}

