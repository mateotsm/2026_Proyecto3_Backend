import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { MuscleGroup } from '../../../common/enums/index.js';
import { Routine } from './routine.entity.js';
import { RoutineExercise } from './routine-exercise.entity.js';
import { WorkoutSession } from '../../workouts/entities/workout-session.entity.js';

@Entity('routine_days')
export class RoutineDay {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Routine, (routine) => routine.dias, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'routineId' })
  routine: Routine;

  @Column({ name: 'routineId' })
  routineId: string;

  @Column({ type: 'int' })
  diaNumero: number;

  @Column({
    type: 'enum',
    enum: MuscleGroup,
  })
  grupoMuscular: MuscleGroup;

  @OneToMany(() => RoutineExercise, (re) => re.routineDay, {
    cascade: true,
  })
  ejercicios: RoutineExercise[];

  @OneToMany(() => WorkoutSession, (ws) => ws.routineDay)
  sesiones: WorkoutSession[];
}

