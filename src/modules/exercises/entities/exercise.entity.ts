import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { MuscleGroup, ExerciseType } from '../../../common/enums/index.js';
import { RoutineExercise } from '../../routines/entities/routine-exercise.entity.js';

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string | null;

  @Column({
    type: 'enum',
    enum: MuscleGroup,
  })
  grupoMuscular: MuscleGroup;

  @Column({ nullable: true })
  subgrupoMuscular: string | null;

  @Column({
    type: 'enum',
    enum: ExerciseType,
    default: ExerciseType.FUERZA,
  })
  tipo: ExerciseType;

  @OneToMany(() => RoutineExercise, (re) => re.exercise)
  routineExercises: RoutineExercise[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

